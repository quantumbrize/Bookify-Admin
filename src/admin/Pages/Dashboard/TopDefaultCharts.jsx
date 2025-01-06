import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function TopDefaultCharts() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isClearBtnShown, setIsClearBtnShown] = useState(false)


  const handleDateChange = (newStartDate, newEndDate) => {
    let dates = {
      newStartDate: newStartDate,
      newEndDate: newEndDate
    };
    setIsClearBtnShown(true)
  };

  const handleStartDateChange = (date) => {
    setStartDate(date);
    handleDateChange(date, endDate);
  };

  const handleEndDateChange = (date) => {
    setEndDate(date);
    handleDateChange(startDate, date);
  };

  const hideClearBtn = () => {
    setIsClearBtnShown(false)
    setStartDate(null)
    setEndDate(null)
  }


  return (
    <>
      <div className="chart-cards-container">
        {/* date filter */}
        <div className="flex items-center flex-wrap gap20 mb-27 date-pick">
          <div className='DatePicker-wrap' style={{
            display: 'flex',
            fontSize: '13px',
            alignItems: 'center',
            gap: '10px',
            zIndex: '10',
            outline: '1px dashed lightgray',
            padding: '15px',
            borderRadius: '5px',
            flexWrap: 'wrap'
          }}>
            <DatePicker
              id="startDate"
              selected={startDate}
              onChange={handleStartDateChange}
              dateFormat="dd MMM yyyy"
              placeholderText="Start Date"
              autoComplete='off'
            />
            <DatePicker
              id="endDate"
              selected={endDate}
              onChange={handleEndDateChange}
              dateFormat="dd MMM yyyy"
              placeholderText="End Date"
              autoComplete='off'
            />
            {
              isClearBtnShown
              &&
              <button
                className='btn btn-lg'
                style={{ width: 'fit-content', padding: '4px 10px', fontSize: '12px',  backgroundColor: '#505356', color:'#fff' }}
                onClick={() => hideClearBtn()}>
                Clear
              </button>
            }
          </div>
        </div>
        {/* All chart card */}
        <div className="main-content-wrap">
          <div className="tf-section-4 mb-30">
            {/* chart-default */}
            <div className="wg-chart-default chart-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap14">
                  <div className="image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
                      <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                      <defs>
                        <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#92BCFF" />
                          <stop offset="1" stop-color="#2377FC" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <i className="fas fa-user"></i>
                  </div>
                  <div>
                    <div className="body-text mb-2">24 Hours User</div>
                    <h4>34,945</h4>
                  </div>
                </div>

              </div>
              <div className="wrap-chart">
                <div id="line-chart-1"></div>
              </div>
            </div>
            {/* /chart-default */}
            {/* chart-default */}
            <div className="wg-chart-default chart-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap14">
                  <div className="image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
                      <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                      <defs>
                        <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#92BCFF" />
                          <stop offset="1" stop-color="#2377FC" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <i className="icon-users"></i>
                  </div>
                  <div>
                    <div className="body-text mb-2">All Time users</div>
                    <h4>137,802</h4>
                  </div>
                </div>

              </div>
              <div className="wrap-chart">
                <div id="line-chart-2"></div>
              </div>
            </div>
            {/* /chart-default */}
            {/* chart-default */}
            <div className="wg-chart-default chart-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap14">
                  <div className="image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
                      <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                      <defs>
                        <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#92BCFF" />
                          <stop offset="1" stop-color="#2377FC" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <i className="fas fa-store"></i>
                  </div>
                  <div>
                    <div className="body-text mb-2">24 Hours Vendor</div>
                    <h4>34,945</h4>
                  </div>
                </div>

              </div>
              <div className="wrap-chart">
                <div id="line-chart-1"></div>
              </div>
            </div>
            {/* /chart-default */}
            {/* chart-default */}
            <div className="wg-chart-default chart-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap14">
                  <div className="image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
                      <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                      <defs>
                        <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#92BCFF" />
                          <stop offset="1" stop-color="#2377FC" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <i className="fas fa-store"></i>
                  </div>
                  <div>
                    <div className="body-text mb-2">All Time Vendor</div>
                    <h4>137,802</h4>
                  </div>
                </div>

              </div>
              <div className="wrap-chart">
                <div id="line-chart-2"></div>
              </div>
            </div>
            {/* /chart-default */}
            {/* chart-default */}
            <div className="wg-chart-default chart-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap14">
                  <div className="image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
                      <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                      <defs>
                        <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#92BCFF" />
                          <stop offset="1" stop-color="#2377FC" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <i className="icon-inbox"></i>
                  </div>
                  <div>
                    <div className="body-text mb-2">Total Orders</div>
                    <h4>44,945</h4>
                  </div>
                </div>
              </div>
              <div className="wrap-chart">
                <div id="line-chart-3"></div>
              </div>
            </div>
            {/* /chart-default */}
            {/* chart-default */}
            <div className="wg-chart-default chart-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap14">
                  <div className="image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
                      <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                      <defs>
                        <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#92BCFF" />
                          <stop offset="1" stop-color="#2377FC" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <i className="icon-image"></i>
                  </div>
                  <div>
                    <div className="body-text mb-2">Banner Counts</div>
                    <h4>74,945</h4>
                  </div>
                </div>
              </div>
              <div className="wrap-chart">
                <div id="line-chart-4"></div>
              </div>
            </div>
            {/* /chart-default */}
            {/* chart-default */}
            <div className="wg-chart-default chart-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap14">
                  <div className="image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
                      <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                      <defs>
                        <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#92BCFF" />
                          <stop offset="1" stop-color="#2377FC" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <i className="icon-list"></i>
                  </div>
                  <div>
                    <div className="body-text mb-2">Category Counts</div>
                    <h4>74,945</h4>
                  </div>
                </div>
              </div>
              <div className="wrap-chart">
                <div id="line-chart-4"></div>
              </div>
            </div>
            {/* /chart-default */}
            {/* chart-default */}
            <div className="wg-chart-default chart-default">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap14">
                  <div className="image">
                    <svg xmlns="http://www.w3.org/2000/svg" width="48" height="52" viewBox="0 0 48 52" fill="none">
                      <path opacity="0.08" d="M19.1086 2.12943C22.2027 0.343099 26.0146 0.343099 29.1086 2.12943L42.4913 9.85592C45.5853 11.6423 47.4913 14.9435 47.4913 18.5162V33.9692C47.4913 37.5418 45.5853 40.8431 42.4913 42.6294L29.1086 50.3559C26.0146 52.1423 22.2027 52.1423 19.1086 50.3559L5.72596 42.6294C2.63194 40.8431 0.725956 37.5418 0.725956 33.9692V18.5162C0.725956 14.9435 2.63195 11.6423 5.72596 9.85592L19.1086 2.12943Z" fill="url(#paint0_linear_53_110)" />
                      <defs>
                        <linearGradient id="paint0_linear_53_110" x1="-43.532" y1="-34.3465" x2="37.6769" y2="43.9447" gradientUnits="userSpaceOnUse">
                          <stop stop-color="#92BCFF" />
                          <stop offset="1" stop-color="#2377FC" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <i className="icon-layers"></i>
                  </div>
                  <div>
                    <div className="body-text mb-2">Sub-Category Counts</div>
                    <h4>74,945</h4>
                  </div>
                </div>
              </div>
              <div className="wrap-chart">
                <div id="line-chart-4"></div>
              </div>
            </div>
            {/* /chart-default */}
          </div>
        </div>
      </div>
    </>
  )
}

export default TopDefaultCharts