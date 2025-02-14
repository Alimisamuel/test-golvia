import { useEffect, useState } from "react";


interface Notification {
  id: string;
  message: string;
  timestamp: string;
}


const baseUrl = process.env.REACT_SOCKET_BASE_URL;

const useNotificationListener = (email:string) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);


  useEffect(() => {

    const websocketUrl = `wss://preprod.golvia.tech/ws/notifications?email=${email}`;

const socket = new WebSocket(websocketUrl)
socket.onopen = () =>{
  console.log("Golvia websocket connected successfully")
}
socket.onmessage = (event) =>{
  console.log("new event", event.data)
}
// socket.onclose = () =>{
//   console.log("Golvia websocket Disconnected")
// }
socket.onerror = (error) =>{
  console.log(error, "Websocket error")
}


    return () => {
    };
  }, [email]);

  return { notifications,  };
};

export default useNotificationListener;
