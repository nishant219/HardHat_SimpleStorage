const {ethers, run} = require("hardhat");
//run allows us to run any hardhat task

async function main(){
  const SimpleStorageFactory= await ethers.getContractFactory("SimpleStorage");
  console.log("Deploying contract");
  const simpleStorage=await SimpleStorageFactory.deploy();
  await simpleStorage.deployed();
  console.log(`Deployed contract to: ${simpleStorage.address}`);

  //to verify
  // if(process.env.ETHERSCAN_API_KEY){
  //   await simpleStorage.deployTransaction.wait(5);
  //   await verify(simpleStorage.address,[]);
  // }

  //intereact with contract
  //get value, read it, update it, wait,  print new one
  const currentValue= await simpleStorage.retrieve();
  console.log(`Current Value is : ${currentValue}`);

  const transctionResponse=await simpleStorage.store(7);
  await transctionResponse.wait(1);

  const updatedValue= await simpleStorage.retrieve();
  console.log(`Updated value : ${updatedValue}`);



}

//npx hardhat verify --network mainnet DEPLOYED_CONTRACT_ADDRESS "Constructor argument 1"
//or manually verify like this
async function verify(contractAddress, args){
  console.log("verifying contract...");
  //verify verifies contract on etherscan
  try{
    await run("verify",{
      address: contractAddress,
      constructorArguments: args, 
    });
  }catch(e){
    if(e.message.toLowerCase().includes("already verified")){
      console.log("Already verified")
    }else{
      console.log(e);
    }
  }

}

 
main().then(()=>process.exit(0)).catch(
  (error)=>{
    console.log(error);
    process.exit(1);
  }
)