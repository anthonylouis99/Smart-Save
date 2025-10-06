

import { TopCard } from "../../components/cards/Cards";
import { Tables } from "../../components/Tables";
import transactionData from '../../transactiondata'

// import {CardSkeletonLoader} from '../../components/common/loader/skeletonLoaderForCards'

export function Transactions() {




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

 
   return (
     <div>
       
         <div className=" flex flex-col gap-6 border-b border-gray-200">
       <div >
       <p className="text-2xl font-bold"> 
     Transactions
       </p>
       
       <p>
         Lets check your Transactions
       </p>
       
       </div>
       
       <div className=" flex gap-2 pb-8">
         <div className="border-r flex-1 border-gray-200 pr-2 "><TopCard className={'bg-[var(--card-background-light)] rounded-l-lg'}Title={"Total Balance"} balance={"20,200"} underText={"Good month"}/></div>
            <div className="border-r border-gray-200 flex-1"><TopCard Title={"Total Balance"} balance={"20,200"} underText={"Good month"}/></div>
          <div className="flex-1"><TopCard Title={"Total Balance"} balance={"20,200"} underText={"Good month"}/></div>
       </div>
       
         </div>


<Tables columns={columns} data={transactionData} />

     </div>
   );
}
