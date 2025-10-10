// import { useCardData } from "../../API";
import { TopCard } from "../../components/cards/Cards";
import { Card } from "../../components/cards/SavingsCard";
import { LoadingSpinner } from "../../components/common/loader/Loader";
import { useGetItems } from "../../components/hooks/fireBaseFunctions/getFile";
import { DashboardHeader } from "../../components/Headers/dashBoardHeader";
import { type cardItems } from "./dashBoard";
import { Plus } from "lucide-react";
import {useMemo} from "react"
// import { useAuth } from "../../context/AuthProvider/auth";
import { useNavigate } from "react-router-dom";
export function Items() {
  const { items, isLoading } = useGetItems({ itemGetter: "dashboard/Plans/items" });
  const { items: savings, isLoading: loadingSavings } = useGetItems({ itemGetter: "dashboard" });
  const isGettingData=isLoading||loadingSavings;
  const mainsavings = savings.find(item => item.id === "SavingsBalance");


const stars='****'
  // const {user}=useAuth()
  const navigate =useNavigate()
  // const totalSaved = savings && savings.length > 0 
  // ? Number(savings[0].Savings ?? 0) 
  // : 0;
 const allocatedPercentage=useMemo(() => (
      items.reduce((acc, item) => acc + Number(item.allocation), 0)

    ), [items])

    

  const distributedPlans = (items as cardItems[]).map((item) => {
    const allocation = Number(item.allocation ?? 0) / 100; 
    const allocatedAmount = mainsavings?.amount * allocation; 

    return {
      ...item,
      allocatedAmount,
      newBalance: Number(item.currentBalance ?? 0) + allocatedAmount,
    };
  });

  
const savingsBalance=loadingSavings? stars:mainsavings?.amount;

const remainingBalance = useMemo(() => {
  if (!savingsBalance || isNaN(Number(savingsBalance))) return 0;
  const totalBalance = Number(savingsBalance);
  const used = (allocatedPercentage / 100) * totalBalance;
  console.log("used",used)
  return Math.max(0, totalBalance - used);
}, [savingsBalance, allocatedPercentage]);


 if(isGettingData) return<LoadingSpinner text="Getting data......"/>
  return (
    <div>
      <DashboardHeader title="Saving Plans" highlight="You're a step closer" />

        <div className=" flex flex-col gap-6 border-b border-gray-200 mt-4">
 
<div className=" grid md:grid-cols-2 lg:grid-cols-4 gap-2 pb-8">
              
     <div 
           
           className="border-r border-gray-200 flex-1 pr-2">
            <TopCard  icon={<Plus size={16}/>}  currency={true} onclick={()=>navigate('/add-savings')} buttonText="Save"
            className={'bg-[var(--card-background-light)] rounded-l-lg'} Title={"Total Savings"} 
             balance={ savingsBalance }
             underText={'save some more'}/>
        
    </div>



 <div className="border-r flex-1 border-gray-200">
      <TopCard
       icon={<Plus size={16}/>}
       onclick={()=>navigate('/Orders')}
        Title="Saving Plans"
        balance={ isLoading? stars: items.length }
        buttonText="Add plan"

      /> 
  
        </div>


         <div className="flex-1 border-r border-gray-200">
                                                    {/* workOnthis */}
          <TopCard icon={<Plus size={16}/>} 
          Title={"Allocated percentage"}  balance={`% ${allocatedPercentage}`}
      
        // buttonText="percentage"
        />
        </div>

     
         <div className="flex-1">
                          
          <TopCard icon={<Plus size={16}/>}
  
          Title={"Savings Balance"}  balance={`₦  ${Number(remainingBalance).toLocaleString("en-US")}`}
      
        // buttonText="percentage"
        />
        </div>

      </div> 
      
        </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-4 mt-4">
   {distributedPlans.map((plan, idx) => {
        return(  <Card
            key={plan.id || idx}
            id={plan.id}
            ItemName={plan.item}
            target={plan.target}
            completed={plan.status}
            AmmountSaved={plan.allocatedAmount} 
            allocatedPercentage={plan.allocation}
            isGettingData={isGettingData}
            remainingBalance={remainingBalance}
           
          />)
})}
      </div>      
    </div>
  );
}
