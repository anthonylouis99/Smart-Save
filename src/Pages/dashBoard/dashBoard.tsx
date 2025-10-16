// import { useCardData } from "../../API";
import { TopCard,SmallCards } from "../../components/cards/Cards";
import { AnimatedLineChart,AnimatedBarChart } from "../../components/charts/bar";
import { Wallet2,Plus } from "lucide-react";
import { Tables } from "../../components/Tables";
import { LoadingSpinner } from "../../components/common/loader/Loader";
// import { useMemo } from "react";
import transactionData from '../../transactiondata'
import Button from "../../components/common/Button/Button";
import { useAuth } from "../../context/AuthProvider/auth";
import { useGetItems } from "../../components/hooks/fireBaseFunctions/getFile";
import { useNavigate } from "react-router-dom";
import { DashboardHeader } from "../../components/Headers/dashBoardHeader";
import toast from "react-hot-toast";
import { AddInvestmentModal } from "../pageModals/investModal";
import { useState } from "react";


  export type cardItems = {
  id: string;
  item: string;
  target: number;
  currentBalance: number;
  allocation?: number;
  status?:string
};
export type InvestmentOption = {
  id: string;
  name: string;
  interestRate: number; 
  price?:number;
  timeFrame?:string
};

export function Dashboard() {


// Use useEffect and useState to handle async data fetching
const[isInvestModalOpen, setIsInvestModalOpen]=useState(false)
const[selectedInvestMent, setSelectedInvestment]=useState<InvestmentOption|null>(null)
const{items:dashboardItems,isLoading,}=useGetItems({itemGetter:'dashboard'})
const{items:smallCardItems,isLoading:loadingSmallCards,}=useGetItems({itemGetter:"dashboard/Plans/items"})
// const{items:savings,isLoading:loadingSavings,}=useGetItems({itemGetter:'Savings'})
const mainBalance = dashboardItems.find(item => item.id === "MainBalance");
const mainsavings = dashboardItems.find(item => item.id === "SavingsBalance");
const investment = dashboardItems.find(item => item.id === "InvestmentBalance");

const {user}=useAuth()
const navigate =useNavigate()


  const columns = [
  {
    header: 'Date',
    accessorKey: 'date',
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Category',
    accessorKey: 'category',
  },
   {
    header: 'Amount',
    accessorKey: 'amount',
  },
   {
    header: 'Type',
    accessorKey: 'type',
    
  },
   {
    header: 'ID',
    accessorKey: 'id',
  },
]

const investmentOptions: InvestmentOption[] = [
  { id: "1", name: "TechGrow Inc.", interestRate: 8,price:20000,timeFrame:'5 months' },
  { id: "2", name: "GreenFuture Energy", interestRate: 6.5,price:10000,timeFrame:'3 months'  },
  { id: "3", name: "SafeBank Corp.", interestRate: 4,price:10000,timeFrame:'7 months' },
  // { id: "4", name: "AgroLife Ltd.", interestRate: 7 ,price:10000 },
];
// console.log('this is items',smallCardItems);
console.log('this is dashboardItems',dashboardItems);

const stars='****'


console.log('this is mainBalance',mainBalance);
console.log('this is savings',mainsavings);
console.log('this is investment',investment);

const colors=[' var(--card-background-light)',' var(--card2-background-light)',' var(--card3-background-light)',' var(--card4-background-light)',]

  return (

<div className="flex flex-col gap-10" >

{/* {top Element} */}
  <div className=" flex flex-col gap-6 border-b border-gray-200">


    <DashboardHeader title={`Hello ${user?.displayName || "Guest"}`} highlight="Lets check your Savings"/>

<div className=" grid md:grid-cols-3 gap-2 pb-8">

  <div className="border-r flex-1 border-gray-200"

  >
<TopCard
icon={<Plus size={16}/>}
onclick={()=>navigate('/add-fund')}
onclickTwo={()=>(toast.error("can't Withdraw yet"))}
  Title="Total Balance"
  balance={ isLoading? stars: mainBalance?.amount}
  buttonText="Add fund"
  currency={true}
  secondButton secondButtonText="Withdraw"
/> 
  
  
  </div>
      <div 
     
     className="border-r border-gray-200 flex-1 pr-2">
      <TopCard icon={<Plus size={16}/>}currency={true} onclick={()=>navigate('/add-savings')} buttonText="Save" 
      className={'bg-[var(--card-background-light)] rounded-l-lg'} Title={"Total Savings"} 
       balance={ isLoading? stars: mainsavings?.amount }
        underText={'save some more'}/></div>
   <div className="flex-1"><TopCard  icon={<Plus size={16}/>} currency={true} onclick={()=> {navigate('/invest')

    // console.log('i was clicked');
    
   }}Title={"Investments"}  balance={ isLoading? stars:investment?.amount }

  buttonText="invest"
  />
  </div>
</div> 

  </div>

  {/* {Crads and investments} */}
<div className="grid md:grid-cols-2 gap-4"> 
{loadingSmallCards?<LoadingSpinner/>:
<div className="flex-1 flex-col gap-4 flex border border-gray-200 rounded-lg p-4">
<div className="w-full flex justify-between">
  <div>
  <p className=" text-gray-400">
Your Saving Plans
</p>
    
    </div> 

    <div>
      <Button variant="secondary" onClick={()=>(navigate('/items'))}>
        View All
        </Button>
    </div>

</div>

<div className="grid md:grid-cols-2 lg:grid-cols-2  gap-4 ">

{(smallCardItems as cardItems[]).slice(0,4).map((item: cardItems, idx: number) => (
  <SmallCards
    key={idx}
    item={String(item?.item ?? "")}
    Target={String(item?.target ?? "")}
    color={colors[idx]}
    icon={<Wallet2 className="text-white m-auto" />}
  />
))}

</div>

  </div>

}



<div className="flex-1 border border-gray-200 rounded-lg p-4">
  <div className=" flex justify-between items-center mb-6">
<div className=" flex flex-col gap-1 ">
  <p>Investments</p>
  <small>
    Check out our investment plans
  </small>
</div>
 
      <Button variant="secondary" onClick={()=>(navigate('/invest'))}>
        View All
        </Button>
    </div>



<div className=" flex flex-col gap-4">
  {investmentOptions.map((company) => {
  
          return (
            <div
              key={company.id}
              className="flex items-center justify-between border p-2 border-gray-200 rounded-xl shadow-sm"
            >
              <div className="flex flex-col gap-1">
               
                <span className="font-medium">{company.name}</span>
                <span className="text-sm text-gray-500">
                  Interest Rate: {company.interestRate}%
                </span>
              </div>

              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  onClick={() => {setIsInvestModalOpen(true); setSelectedInvestment(company)}}
                >
                  Invest
                </Button>
              </div>
            </div>
          );
        })}
</div>
</div>
</div>


<div className="grid md:grid-cols-2 gap-4 border border-gray-200 ">
  <div className="bg-white p-4 h-full rounded-lg ">
    <p className="text-lg font-semibold mb-4">Savings Overview</p>
    <div className="">
      <AnimatedLineChart />
    </div>
  </div>

  <div className="bg-white p-4 h-full flex-1 rounded-lg ">
    <p className="text-lg font-semibold mb-4">Category Distribution</p>
    <div className="">
      <AnimatedBarChart />
    </div>
  </div>
</div>
<AddInvestmentModal onClose={()=>setIsInvestModalOpen(false)} isOpen={isInvestModalOpen} isloading={false} data={selectedInvestMent as InvestmentOption }/>
<Tables columns={columns} data={transactionData} />
  </div>

  );
}
