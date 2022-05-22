import React, { useEffect } from "react";
import { ethers } from "ethers";
import { getAddress } from "ethers/lib/utils";
import {
  ChainId,
  Fetcher,
  WETH,
  Route,
  Trade,
  TokenAmount,
  TradeType,
} from "@uniswap/sdk";
import Web3Modal from "web3modal";

import UNISWAPV2_ROUTER_ABI from "../../abi/router.json";

//! 1. Use JS Uniswapv2 SDK
//! 2. Use new Ethers.Contract(address, abi, provider/signer)

type Props = {};

const Demo = (Props: Props) => {
  const provider = new ethers.providers.AlchemyProvider(
    "mainnet",
    process.env.ALCHEMY_API_KEY
  );

  const CHAIN_ID = ChainId.MAINNET;
  const weth = WETH[CHAIN_ID];
  const DAI_TOKEN_ADDRESS = "0x6B175474E89094C44Da98b954EedeAC495271d0F";
  const USDC_TOKEN_ADDRESS = "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48";
  const UNISWAPV2_ROUTER_ADDRESS = "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

  useEffect(() => {
    (async () => {
      const dai = await Fetcher.fetchTokenData(
        CHAIN_ID,
        DAI_TOKEN_ADDRESS,
        provider
      );
      const usdc = await Fetcher.fetchTokenData(
        CHAIN_ID,
        USDC_TOKEN_ADDRESS,
        provider
      );

      const pair = await Fetcher.fetchPairData(dai, weth, provider);

      const route = new Route([pair], weth);
      const trade = new Trade(
        route,
        new TokenAmount(weth, "100000000000000000"),
        TradeType.EXACT_INPUT
      );
      console.log("Mid Price WETH --> DAI:", route.midPrice.toSignificant(6));
      console.log(
        "Mid Price DAI --> WETH:",
        route.midPrice.invert().toSignificant(6)
      );
      console.log("-".repeat(45));
      console.log(
        "Execution Price WETH --> DAI:",
        trade.executionPrice.toSignificant(6)
      );
      console.log(
        "Mid Price after trade WETH --> DAI:",
        trade.nextMidPrice.toSignificant(6)
      );
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const res = await provider.getBalance(
        "0x8626f6940e2eb28930efb4cef49b2d1f2c9c1199"
      );
      console.log(ethers.utils.formatEther(res));
    })();
    swap();
  }, []);

  //todo
  // https://www.quicknode.com/guides/defi/how-to-swap-tokens-on-uniswap-with-ethers-js
  // https://docs.uniswap.org/protocol/V2/reference/smart-contracts/router-02
  // https://stackoverflow.com/questions/66037884/rinkeby-uniswap-swapexactethfortokens-fail-with-error-uniswapv2router-expire
  // https://stackoverflow.com/questions/68100751/what-is-the-use-of-uniswap-router-initialization-in-a-token-contract
  // https://docs.uniswap.org/sdk/2.0.0/reference/trade
  const swap = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    const uniswapV2RouterContract = new ethers.Contract(
      UNISWAPV2_ROUTER_ADDRESS,
      UNISWAPV2_ROUTER_ABI,
      provider
    );
    console.log("uniswapV2RouterContract", uniswapV2RouterContract);
  };

  return <div>Demo</div>;
};

export default Demo;

// https://www.quicknode.com/guides/defi/how-to-interact-with-uniswap-using-javascript
