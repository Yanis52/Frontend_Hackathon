import { getBestAndWorstYearFrance, getFranceMedal, getMedalCountry } from "@/api/host-query";
import { Card, Skeleton } from "antd";
import Chart from "react-google-charts";


const optionsMedalTypes = {
  chart: {
    title: "Répartition des Médailles Olympiques de la France",
    subtitle: "Argent, OR, and Bronze: depuis 1886",
  },
};

const options = {
  title: "Performance de la France aux Jeux Olympiques",
  curveType: "function",
  legend: { position: "bottom" },
};


Dashboard.displayName = "Dashboard";

export function Dashboard() {

  const { data: apiData, isLoading, error } = getMedalCountry();
  const { data: apiDataFrance } = getBestAndWorstYearFrance();
  const { data: apiFranceMedal } = getFranceMedal()

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <div>Une erreur est survenue: {error.message}</div>;
  }

  const dataPays = apiData?.map((item) => {
    if (item.country_name === "United States of America") {
      item.country_name = "United States";
    }
    if (item.country_name === "Soviet Union") {
      item.country_name = "RU";
    }
    if (item.country_name === "People's Republic of China") {
      item.country_name = "China";
    }
    return [item.country_name, Number(item.total_medals)];
  }) || [];
  dataPays.unshift(["Country", "Medailles"]);
  console.log(dataPays);
  if (!apiDataFrance) return (<div>Loading...</div>);

  const transformedData = apiDataFrance.map(obj => [obj.year, Number(obj.medal_count)]);
  transformedData.unshift(["Year", "Medal count"]);
  if (!apiFranceMedal) return (<div>Loading...</div>);

  const year = " "; // replace with the actual year
  const silver = Number(apiFranceMedal.find(medal => medal.type === "SILVER")?.total) || 0;
  const gold = Number(apiFranceMedal.find(medal => medal.type === "GOLD")?.total) || 0;
  const bronze = Number(apiFranceMedal.find(medal => medal.type === "BRONZE")?.total) || 0;

  const newDataMedalTypes = [
    ["", "Argent", "OR", "Bronze"],
    [year, silver, gold, bronze]
  ];

  const dataMedalTypes = newDataMedalTypes;

  return (
    <div>
      <Card style={{ alignItems: 'center', justifyContent: 'center' }}>
        <h4>Meilleures et Pires des pays par Médaille</h4>
        <Chart
          chartEvents={[
            {
              eventName: "select",
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart();
                const selection = chart.getSelection();
                if (selection.length === 0) return;
                // const region = data[selection[0].row + 1];
                // console.log("Selected : " + region);
              },
            },
          ]}
          chartType="GeoChart"
          width="100%"
          height="500px"
          data={dataPays}
          options={{
            title: "Meilleures et Pires des pays par Médaille",
            colorAxis: { colors: ['white', '#d5c480'] },
            backgroundColor: 'white',
            datalessRegionColor: 'silver',
            defaultColor: 'gray',
          }}
        />
      </Card>
      <br />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-evenly' }}>
        <Card>
          <Chart
            chartType="LineChart"
            width="100%"
            height="400px"
            data={transformedData}
            options={{
              ...options,
              vAxis: {
                format: '0',
              },
              pointSize: 5
            }}
          />
        </Card>
        <Card style={{ marginLeft: 5 }}>
          <Chart
            chartType="Bar"
            width="100%"
            height="400px"
            data={dataMedalTypes}
            options={optionsMedalTypes}
          />
        </Card>

      </div>
    </div>
  );
}
