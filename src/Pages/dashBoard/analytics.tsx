// import { useCardData } from "../../API";
// import { Card } from "../../components/cards/Cards";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// import { authenticator } from "../../FireBase/index";
import { DashboardHeader } from "../../components/Headers/dashBoardHeader";
import { AnimatedLineChart ,AnimatedBarChart} from "../../components/charts/bar";



export function Analytics() {
 
     return (
       <div>
      <DashboardHeader title="Analytics"/>

<div className="p-4 grid md:grid-cols-2 gap-4">


<div className="bg-white p-4 rounded-lg shadow-lg">
    {/* <h2 className="text-sm font-semibold mb-4">Category Distribution</h2> */}
         <AnimatedLineChart />
  </div>


  <div className="bg-white p-4 rounded-lg shadow-lg">
    {/* <h2 className="text-lg font-semibold mb-4">Category Distribution</h2> */}
    <AnimatedLineChart />
  </div>




  <div className="bg-white p-4 rounded-lg shadow-lg">
    {/* <h2 className="text-lg font-semibold mb-4">Category Distribution</h2> */}
     <AnimatedBarChart/> 
  </div>

</div>
      </div> 

     );
}
