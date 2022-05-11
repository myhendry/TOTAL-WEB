import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  FormErrorMessage,
  FormLabel,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { ethers } from "ethers";

import { Demo__factory } from "../../typechain/factories/Demo__factory";
import { demoContractAddress } from "../../config/contract-address";

type Props = {};

type Inputs = {
  name: string;
};

const schema = yup
  .object({
    name: yup.string().required(),
  })
  .required();

export const CryptoForm = (props: Props) => {
  useEffect(() => {
    loadNFTs();
  }, []);

  const loadNFTs = async () => {
    const provider = new ethers.providers.JsonRpcProvider();
    const demoContract = Demo__factory.connect(demoContractAddress, provider);
    console.log(demoContract);
    const name = await demoContract.getName();
    console.log("name", name);
  };

  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (values) => {
    return new Promise((resolve: any) => {
      setTimeout(() => {
        alert(JSON.stringify(values, null, 2));
        resolve();
      }, 3000);
    });
  };

  return (
    <div className="p-12">
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={!!errors.name}>
          {/* <FormLabel htmlFor="name">First name</FormLabel> */}
          <Input
            id="name"
            placeholder="name"
            {...register("name", {
              required: "This is required",
              minLength: { value: 4, message: "Minimum length should be 4" },
            })}
          />
          <FormErrorMessage>
            {errors.name && errors.name.message}
          </FormErrorMessage>
        </FormControl>
        <Button
          mt={4}
          colorScheme="teal"
          isLoading={isSubmitting}
          type="submit"
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
