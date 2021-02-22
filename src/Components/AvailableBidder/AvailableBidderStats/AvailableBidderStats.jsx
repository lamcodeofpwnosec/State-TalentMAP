import { useState } from 'react';
import { useSelector } from 'react-redux';
import { get, sumBy } from 'lodash';
import numeral from 'numeral';
import FA from 'react-fontawesome';
import { PieChart, Pie, Cell } from 'recharts';
import InteractiveElement from 'Components/InteractiveElement';
import LoadingText from 'Components/LoadingText';
import { Row } from '../../Layout';


const AvailableBidderStats = () => {
  const [showMore, setShowMore] = useState(false);

  // App state
  const biddersData = useSelector(state => state.availableBiddersFetchDataSuccess);
  const availableBiddersIsLoading = useSelector(state => state.availableBiddersFetchDataLoading);

  const stats = get(biddersData, 'stats', {});

  const statsSum = Object.values(stats).reduce((a, b) => a + b, 0);

  console.log(biddersData, availableBiddersIsLoading);

  let data = [
    { name: 'Overcompliment (OC)', key: 'OC', value: 0, color: '#112E51' },
    { name: 'Unassigned (UA)', key: 'UA', value: 0, color: '#205493' },
    { name: 'In Transit (IT)', key: 'IT', value: 0, color: '#9BDAF1' },
    { name: 'Absent without leave (AWOL)', key: 'AWOL', value: 0, color: '#02BFE7' },
  ];

  data = data.map(m => ({ ...m, value: get(stats, m.key, 0) }));

  let sum = sumBy(data, 'value');

  if (sum === 0) {
    data = data.map(m => ({ ...m, value: 1 }));
    sum = sumBy(data, 'value');
  }

  const data$ = data.map(m => ({
    ...m,
    percent: numeral(m.value / sum).format('0%'),
  }));

  const chartData$ = data$.filter(f => f.value > 0);

  return (
    <div className="usa-grid-full available-bidders-stats">
      <div className="usa-grid-full">
        <Row className="usa-grid-full">
          <div className="usa-grid-full toggle-more-container">
            <InteractiveElement className="toggle-more" onClick={() => setShowMore(!showMore)}>
              <h3>
                <FA name="pie-chart" />  Statistics  <FA name={`chevron-${showMore ? 'down' : 'right'}`} />
              </h3>
            </InteractiveElement>
          </div>
          {
            showMore &&
            <div className="usa-grid-full section statistics-section">
              {
                !!availableBiddersIsLoading && <LoadingText />
              }
              {
                !availableBiddersIsLoading && !statsSum && 'No available bidders have an assigned status.'
              }
              {
                !availableBiddersIsLoading && !!statsSum &&
                <div className="usa-grid-full flex">
                  <div className="usa-width-one-fourth legend-container">
                    <div className="usa-grid-full legend">
                      <h4>Available Bidders by Status</h4>
                      {
                        data$.map(m => (
                          <div className="flex legend-item">
                            <div
                              className="legend-square"
                              style={{ backgroundColor: m.color }}
                            />
                            <div className="legend-text">{`${m.percent} ${m.name}`}</div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="usa-width-one-third chart-container">
                    <PieChart width={400} height={400}>
                      <Pie
                        data={chartData$}
                        cx={200}
                        cy={200}
                        labelLine={false}
                        outerRadius={180}
                        fill="#8884d8"
                        dataKey="value"
                      >
                        {
                        // eslint-disable-next-line react/no-array-index-key
                          chartData$.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)
                        }
                      </Pie>
                    </PieChart>
                  </div>
                </div>
              }
            </div>
          }
        </Row>
      </div>
    </div>
  );
};

export default AvailableBidderStats;
