// // import * as React from "react";
// import { AlertDialog } from "radix-ui";
// // import "./styles.css";

// type AlertDialogDemoProps = {
//   alertTrigger: React.ReactNode;
//   alertMessageTittle: string;
//   alertMessage: string;
//   declineText: string;
//   acceptText: string;
// };

// const AlertDialogDemo = ({
//   alertTrigger,
//   alertMessageTittle,
//   alertMessage,
//   declineText,
//   acceptText,
// }: AlertDialogDemoProps) => (
//   <AlertDialog.Root>
//     <AlertDialog.Trigger asChild>{alertTrigger}</AlertDialog.Trigger>
//     <AlertDialog.Portal>
//       <AlertDialog.Overlay className="AlertDialogOverlay" />
//       <AlertDialog.Content className="AlertDialogContent">
//         <AlertDialog.Title className="AlertDialogTitle">
//           {alertMessageTittle}
//         </AlertDialog.Title>
//         <AlertDialog.Description className="AlertDialogDescription">
//           {alertMessage}
//         </AlertDialog.Description>
//         <div style={{ display: "flex", gap: 25, justifyContent: "flex-end" }}>
//           <AlertDialog.Cancel asChild>
//             <button className="Button mauve">{acceptText}</button>
//           </AlertDialog.Cancel>
//           <AlertDialog.Action asChild>
//             <button className="Button red">{declineText}</button>
//           </AlertDialog.Action>
//         </div>
//       </AlertDialog.Content>
//     </AlertDialog.Portal>
//   </AlertDialog.Root>
// );

// export default AlertDialogDemo;
