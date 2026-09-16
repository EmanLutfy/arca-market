// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title ARCA binary prediction markets
/// @notice Testnet MVP using Arc's native USDC as collateral.
/// @dev Creator resolution is intentionally explicit for the first testnet milestone.
contract ArcaPredictionMarket {
    enum Outcome {
        Unresolved,
        Yes,
        No,
        Invalid
    }

    struct Market {
        address creator;
        string question;
        string sourceMarketId;
        uint64 closeTime;
        uint64 resolutionTime;
        uint256 yesPool;
        uint256 noPool;
        Outcome outcome;
        bool exists;
    }

    uint256 public marketCount;
    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => uint256)) public yesShares;
    mapping(uint256 => mapping(address => uint256)) public noShares;
    mapping(uint256 => mapping(address => bool)) public claimed;

    event MarketCreated(
        uint256 indexed marketId,
        address indexed creator,
        string question,
        uint64 closeTime,
        uint64 resolutionTime,
        string sourceMarketId
    );
    event PositionBought(
        uint256 indexed marketId,
        address indexed trader,
        bool yes,
        uint256 amount
    );
    event MarketResolved(uint256 indexed marketId, Outcome outcome);
    event WinningsClaimed(uint256 indexed marketId, address indexed trader, uint256 amount);

    error InvalidMarket();
    error InvalidSchedule();
    error MarketClosed();
    error MarketNotReady();
    error AlreadyResolved();
    error NotCreator();
    error InvalidOutcome();
    error NothingToClaim();
    error TransferFailed();

    function createMarket(
        string calldata question,
        uint64 closeTime,
        uint64 resolutionTime,
        string calldata sourceMarketId
    ) external returns (uint256 marketId) {
        if (bytes(question).length == 0) revert InvalidMarket();
        if (closeTime <= block.timestamp || resolutionTime <= closeTime) {
            revert InvalidSchedule();
        }

        marketId = marketCount++;
        markets[marketId] = Market({
            creator: msg.sender,
            question: question,
            sourceMarketId: sourceMarketId,
            closeTime: closeTime,
            resolutionTime: resolutionTime,
            yesPool: 0,
            noPool: 0,
            outcome: Outcome.Unresolved,
            exists: true
        });

        emit MarketCreated(marketId, msg.sender, question, closeTime, resolutionTime, sourceMarketId);
    }

    function buy(uint256 marketId, bool yes) external payable {
        Market storage market = markets[marketId];
        if (!market.exists) revert InvalidMarket();
        if (market.outcome != Outcome.Unresolved) revert AlreadyResolved();
        if (block.timestamp >= market.closeTime) revert MarketClosed();
        if (msg.value == 0) revert InvalidMarket();

        if (yes) {
            market.yesPool += msg.value;
            yesShares[marketId][msg.sender] += msg.value;
        } else {
            market.noPool += msg.value;
            noShares[marketId][msg.sender] += msg.value;
        }

        emit PositionBought(marketId, msg.sender, yes, msg.value);
    }

    function resolve(uint256 marketId, Outcome outcome) external {
        Market storage market = markets[marketId];
        if (!market.exists) revert InvalidMarket();
        if (msg.sender != market.creator) revert NotCreator();
        if (market.outcome != Outcome.Unresolved) revert AlreadyResolved();
        if (block.timestamp < market.resolutionTime) revert MarketNotReady();
        if (outcome != Outcome.Yes && outcome != Outcome.No && outcome != Outcome.Invalid) {
            revert InvalidOutcome();
        }

        market.outcome = outcome;
        emit MarketResolved(marketId, outcome);
    }

    function claim(uint256 marketId) external {
        Market storage market = markets[marketId];
        if (!market.exists) revert InvalidMarket();
        if (market.outcome == Outcome.Unresolved) revert MarketNotReady();
        if (claimed[marketId][msg.sender]) revert NothingToClaim();

        uint256 yes = yesShares[marketId][msg.sender];
        uint256 no = noShares[marketId][msg.sender];
        uint256 winningPool;
        uint256 userShares;

        if (market.outcome == Outcome.Yes) {
            winningPool = market.yesPool;
            userShares = yes;
        } else if (market.outcome == Outcome.No) {
            winningPool = market.noPool;
            userShares = no;
        } else {
            winningPool = market.yesPool + market.noPool;
            userShares = yes + no;
        }

        if (userShares == 0 || winningPool == 0) revert NothingToClaim();
        uint256 totalPool = market.yesPool + market.noPool;
        uint256 payout = (userShares * totalPool) / winningPool;
        claimed[marketId][msg.sender] = true;

        (bool success, ) = payable(msg.sender).call{value: payout}("");
        if (!success) revert TransferFailed();
        emit WinningsClaimed(marketId, msg.sender, payout);
    }

    /// @return yesPriceBps YES probability in basis points (0–10,000).
    function probability(uint256 marketId) external view returns (uint256 yesPriceBps) {
        Market storage market = markets[marketId];
        if (!market.exists) revert InvalidMarket();
        uint256 total = market.yesPool + market.noPool;
        if (total == 0) return 5000;
        return (market.yesPool * 10_000) / total;
    }
}
