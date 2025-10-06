// import { useCardData } from "../../API";
import { TopCard,SmallCards } from "../../components/cards/Cards";
import { AnimatedBarChart,AnimatedPieChart } from "../../components/charts/bar";
import { Wallet2,Plus } from "lucide-react";
import { Tables } from "../../components/Tables";
import { LoadingSpinner } from "../../components/common/loader/Loader";
// import { useMemo } from "react";
import transactionData from '../../transactiondata'
import Button from "../../components/common/Button/Button";
import { useAuth } from "../../context/AuthProvider/auth";
import { useGetItems } from "../../components/hooks/fireBaseFunctions/getFile";
// import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
// import { dashboardItemsgetter,docsGetter } from "../../FireBase";

  export type cardItems = {
  id: string;
  item: string;
  target: number;
  currentBalance: number;
  allocation?: number;
  status?:string
};

export function Dashboard() {


// Use useEffect and useState to handle async data fetching

const{items,isLoading,}=useGetItems({itemGetter:'DashboardData'})
const{items:smallCardItems,isLoading:loadingSmallCards,}=useGetItems({itemGetter:'SmallCardsItems'})
const{items:savings,isLoading:loadingSavings,}=useGetItems({itemGetter:'Savings'})


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
console.log('this is items',smallCardItems);
console.log('this is items',items);

const stars='****'

const colors=[' var(--card-background-light)',' var(--card2-background-light)',' var(--card3-background-light)',' var(--card4-background-light)',]

  return (

<div className="flex flex-col gap-10" >

{/* {top Element} */}
  <div className=" flex flex-col gap-6 border-b border-gray-200">
<div >
<p className="text-2xl font-bold"> 
Hello {user?.displayName || "Guest"}, Good Morning
</p>

<p>
  Lets check your Savings
</p>

</div>

<div className=" grid md:grid-cols-3 gap-2 pb-8">

  <div className="border-r flex-1 border-gray-200"

  >
<TopCard
icon={<Plus size={16}/>}
onclick={()=>navigate('/add-fund')}
  Title="Total Balance"
  balance={ isLoading? stars: items.length > 0? (items[0])["Main-balance"] : 0

  }
  buttonText="Add fund"
      currency={true}
/> 
  
  
  </div>
      <div 
     
     className="border-r border-gray-200 flex-1 pr-2"><TopCard icon={<Plus size={16}/>}currency={true} onclick={()=>navigate('/add-savings')} buttonText="Save"
      className={'bg-[var(--card-background-light)] rounded-l-lg'} Title={"Total Savings"} 
       balance={ loadingSavings? stars: savings.length > 0? (savings[0])["Savings"] : 0
  }
  underText={'save some more'}/></div>
   <div className="flex-1"><TopCard  icon={<Plus size={16}/>} currency={true} onclick={()=> {navigate('/invest')

    console.log('i was clicked');
    
   }}Title={"Investments"}  balance={ isLoading? stars: items.length > 0? (items[0])["investments"] : 0
  }

  buttonText="invest"
  /></div>
</div> 

  </div>

  {/* {Crads and investments} */}
<div className="flex gap-4"> 
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
<div>
  <p>Investments</p>
  <small>
    Check out our investment plans
  </small>
</div>

</div>

</div>


<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
  <div className="bg-white lg:col-span-2 md:col-span-1 p-4 rounded-lg shadow-lg">
    <h2 className="text-lg font-semibold mb-4">Savings Overview</h2>
    <AnimatedBarChart />
  </div>

  <div className="bg-white p-4 rounded-lg shadow-lg">
    <h2 className="text-lg font-semibold mb-4">Category Distribution</h2>
    <AnimatedPieChart />
  </div>
</div> 

<Tables columns={columns} data={transactionData} />

  </div>

  );
}
