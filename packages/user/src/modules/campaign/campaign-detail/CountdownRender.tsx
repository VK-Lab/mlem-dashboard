import { CountdownRenderProps } from "react-countdown";

const CountdownRender = ({
  days,
  hours,
  minutes,
  seconds,
  completed,
}: CountdownRenderProps) => {
  return (
    <div className="happy-hour-countdown">
      <ul id="countdown" className="happy-hour-countdown--wrapper">
        <li id="days" className="block">
          <div className="number">
            <div className="value">{completed ? 0 : days}</div>
          </div>
          <div className="label">Days</div>
        </li>
        <li id="hours" className="block">
          <div className="number">
            <div className="value">{completed ? 0 : hours}</div>
          </div>
          <div className="label">Hours</div>
        </li>
        <li id="minutes" className="block">
          <div className="number">
            <div className="value">{completed ? 0 : minutes}</div>
          </div>
          <div className="label">Minutes</div>
        </li>
        <li id="seconds" className="block">
          <div className="number">
            <div className="value">{completed ? 0 : seconds}</div>
          </div>
          <div className="label">Seconds</div>
        </li>
      </ul>
      <span className="time-note">(Time is set as UTC Timezone)</span>
    </div>
  );
};

export default CountdownRender;
