import Statistic from "./Statistic.js";

const StatisticsTable = ({ feedback }) => {
  const { good, neutral, bad } = feedback;
  const all = good + neutral + bad;
  // feedback values - good:1, neutral:0 bad:-1
  const average = (good - bad) / all || 0;
  const positive = (good * 100) / all || 0;

  const statistics = [
    { name: "good", value: good },
    { name: "neutral", value: neutral },
    { name: "bad", value: bad },
    { name: "all", value: all },
    {
      name: "average",
      value: Number.isInteger(average) ? average : average.toFixed(2),
    },
    {
      name: "positive",
      value:
        (Number.isInteger(positive) ? positive : positive.toFixed(2)) + "%",
    },
  ];

  return (
    <div>
      <h2>statistics</h2>
      {all ? (
        <table>
          <tbody>
            {statistics.map(({ name, value }) => (
              <Statistic name={name} value={value} key={name} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Not feedback given</p>
      )}
    </div>
  );
};

export default StatisticsTable;
