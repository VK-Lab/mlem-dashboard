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
      <ul
        id="countdown"
        className="text-gray-50 gap-4 flex items-center justify-center happy-hour-countdown--wrapper mx-auto pt-8 font-bold"
      >
        {[
          {
            label: "Days",
            value: days,
          },
          {
            label: "Hours",
            value: hours,
          },
          {
            label: "Minutes",
            value: minutes,
          },
          {
            label: "Seconds",
            value: seconds,
          },
        ].map((time) => (
          <li
            key={`time-${time.label}`}
            id={time.label}
            className="m-0 p-0 flex flex-col items-center text-center w-1/4 text-5xl"
          >
            <div className="number w-22 h-22 rounded flex items-center justify-center">
              <div className="value">{completed ? 0 : time.value}</div>
            </div>
            <div className="label mt-1 text-lg">{time.label}</div>
          </li>
        ))}
      </ul>
      <div className="text-md px-4 py-2 rounded time-note text-gray-50 text-center mx-auto text-sm italic">
        (Time is set as UTC Timezone)
      </div>
    </div>
  );
};

export default CountdownRender;
