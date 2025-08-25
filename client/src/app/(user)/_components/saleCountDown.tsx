import { useState, useEffect } from "react";

function SaleCountDown() {
  const INITIAL_COUNTDOWN = 28_944_000;
  const [countdown, setCountdown] = useState(INITIAL_COUNTDOWN);

  useEffect(() => {
    if (countdown <= 0) return;

    const timeout = setTimeout(() => {
      setCountdown(countdown - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [countdown]); 

  const days = Math.floor(countdown / (24 * 3600));
  const hours = Math.floor((countdown % (24 * 3600)) / 3600);
  const minutes = Math.floor((countdown % 3600) / 60);
  const secs = countdown % 60;

  return (
    <div className="grid grid-cols-[150px_150px] text-yellow-500">
      <div className="flex flex-col items-center border border-yellow-500 py-2">
        <span className="text-3xl">{days}</span>
        <span>Ngày</span>
      </div>
      <div className="flex flex-col items-center border border-yellow-500 py-2">
        <span className="text-3xl">{hours}</span>
        <span>Giờ</span>
      </div>
      <div className="flex flex-col items-center border border-yellow-500 py-2">
        <span className="text-3xl">{minutes}</span>
        <span>Phút</span>
      </div>
      <div className="flex flex-col items-center border border-yellow-500 py-2">
        <span className="text-3xl">{secs}</span>
        <span>Giây</span>
      </div>
    </div>
  );
}

export default SaleCountDown;
