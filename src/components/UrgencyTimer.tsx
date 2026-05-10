import { useEffect, useState } from 'react';
import { Clock } from 'lucide-react';

export default function UrgencyTimer({ minutes }: { minutes: number }) {
  const [timeLeft, setTimeLeft] = useState(minutes * 60);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const m = Math.floor(timeLeft / 60);
  const s = timeLeft % 60;

  if (timeLeft <= 0) return null;

  return (
    <div className="flex items-center gap-1.5 text-xs font-semibold text-secondary-orange bg-orange-50 px-2.5 py-1 rounded-full w-fit">
      <Clock size={12} className="animate-pulse" />
      <span>Discount ends in: {m.toString().padStart(2, '0')}:{s.toString().padStart(2, '0')}</span>
    </div>
  );
}
