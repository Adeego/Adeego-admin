import React, { useState, useEffect } from "react";
import { RequestPermission, onMessageListener } from "../../firebaseConfig";
import ringSound from "../Assets/ring.wav";
import { toast } from "sonner";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

function Notification() {
  const [audioInstance, setAudioInstance] = useState(null);
  const [isProcessed, setOrderProcessed] = useState(false);

  const PlayAudio = () => {
    const sound = new Audio(ringSound);
    sound.play();
    sound.addEventListener("ended", () => {
      sound.currentTime = 0;
      sound.play();
    });
    setOrderProcessed(true);
    setAudioInstance(sound);
  };

  const StopAudio = () => {
    if (audioInstance) {
      audioInstance.pause();
      setAudioInstance(null);
    }
  };

  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    // RequestPermission();
    const unsubscribe = onMessageListener().then((payload) => {
      setNotification({
        title: payload?.notification?.title,
        body: payload?.notification?.body,
      });
      console.log(payload);
      PlayAudio();
    });
    return () => {
      unsubscribe.catch((err) => console.log("failed: ", err));
    };
  }, []);

  return (
    <div>
      <RequestPermission />
      
      <Dialog open={isProcessed}>
        <DialogContent className="bg-white w-[90%] !rounded-[0.5rem] gap-5">
          <DialogHeader>
            <DialogTitle className="text-start md:text-xl">
              New Order
            </DialogTitle>
          </DialogHeader>

          <p className="text-sm md:text-base">{notification.body}</p>

          <DialogFooter className="flex items-end">
            <div className="flex justify-end w-full gap-2">
              <DialogClose>
                <button
                  onClick={() => {
                    StopAudio();
                    setOrderProcessed(false);
                  }}
                  className="bg-black text-white rounded-[0.4rem] text-xs py-2 p-3 flex items-center gap-1 md:gap-2 font-medium lg:px-6"
                >
                  Process order
                </button>
              </DialogClose>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
export default Notification;
