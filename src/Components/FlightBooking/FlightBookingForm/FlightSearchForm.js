import { useState } from "react";
import Header from "../../Homepage/Header/Header";
import { MdFlight } from "react-icons/md";
import { MdFlightTakeoff } from "react-icons/md";
import { MdFlightLand } from "react-icons/md";
import DatePicker from "react-datepicker";
import { AiFillCalendar } from "react-icons/ai";
import { BsFillPeopleFill } from "react-icons/bs";
import { AiOutlineUp } from "react-icons/ai";
import { AiOutlineDown } from "react-icons/ai";
import { BsArrowRight } from "react-icons/bs";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";

import "react-datepicker/dist/react-datepicker.css";
import "./FlightSearchForm.css";

const FlightSearchForm = () => {
  const [oneWayActive, setOneWayActive] = useState(false);
  const [selectedDepartureDate, setSelectedDepartureDate] = useState(
    new Date()
  );
  const [selectedReturnDate, setSelectedReturnDate] = useState(new Date());
  const [peopleValue, setPeopleValue] = useState(1);
  const [address, setAddress] = useState("");
  const [featureAvailable, setFeatureAvailble] = useState(false);

  const decrementHandler = () => {
    if (+peopleValue === 1) return;
    setPeopleValue(+peopleValue - 1);
  };
  const IncrementHandler = () => {
    if (+peopleValue === 9) return;
    setPeopleValue(+peopleValue + 1);
  };

  const flightBookingFormHandler = (e) => {
    e.preventDefault();
  };

  const addressSelectHandler = async (value) => {
    setAddress(value);
    const result = geocodeByAddress(value);
  };

  return (
    <section className="flight-section">
      <Header />
      <div className="content-section">
        <div className="content-box">
          <h1>Ready to take off?</h1>
          <p>depart from anywhere. arrive to anyplace.</p>
        </div>
      </div>
      <form onSubmit={flightBookingFormHandler} className="bookflight-form">
        {featureAvailable && (
          <h1 className="available-soon">
            This feauture will be available soon.
          </h1>
        )}
        <div className="flight-option-btn">
          <button
            className={`${!oneWayActive && "btn__active"} `}
            onClick={() => {
              setOneWayActive(false);
            }}
          >
            <MdFlight className="flight-icon" /> round-trip
          </button>
          <button
            className={`${oneWayActive && "btn__active"}`}
            onClick={() => {
              setOneWayActive(true);
            }}
          >
            <MdFlight className="flight-icon" /> one-way
          </button>
        </div>

        <div className="flight-input__information">
          <div className="flight-input__box">
            <div className="flight-departure__arrival">
              <div className="flight-icon-box">
                <MdFlightTakeoff className="flight-icon" />
              </div>
              <div className="input-con">
                <p>Departure</p>
                <PlacesAutocomplete
                  className="auto-complete"
                  value={address}
                  onChange={setAddress}
                  onSelect={addressSelectHandler}
                >
                  {({
                    getInputProps,
                    suggestions,
                    getSuggestionItemProps,
                    loading,
                  }) => {
                    return (
                      <input
                        {...getInputProps({
                          placeholder: "select city",
                          type: "text",
                        })}
                      />
                    );
                    {
                      loading && <div>loading...</div>;
                    }
                    {
                      suggestions.map((suggestion) => {
                        return (
                          <div {...getSuggestionItemProps(suggestion)}>
                            {suggestion.description}
                          </div>
                        );
                      });
                    }
                  }}
                </PlacesAutocomplete>
              </div>
            </div>

            <div className="flight-departure__arrival">
              <div className="flight-icon-box">
                <MdFlightLand className="flight-icon" />
              </div>

              <div className="input-con">
                <p>Arrival</p>
                <input type="text" placeholder=" select city" />
              </div>
            </div>
          </div>

          <div className="flight-date__box">
            <div className="depature-arrival__date">
              <div className="flight-icon-box">
                <AiFillCalendar className="flight-icon" />
              </div>

              <div className="input-con">
                <p>Departure Date</p>
                <DatePicker
                  selected={selectedDepartureDate}
                  onChange={(date) => setSelectedDepartureDate(date)}
                  minDate={new Date()}
                  className="date-picker"
                />
              </div>
            </div>

            {!oneWayActive && (
              <div className="depature-arrival__date">
                <div className="flight-icon-box">
                  <AiFillCalendar className="flight-icon" />
                </div>
                <div className="input-con">
                  <p>Return Date</p>
                  <DatePicker
                    selected={selectedReturnDate}
                    onChange={(date) => {
                      setSelectedReturnDate(date);
                    }}
                    minDate={new Date()}
                    className="date-picker"
                  />
                </div>
              </div>
            )}
          </div>

          <div className="add-people-box">
            <div className="people-icon-box">
              <BsFillPeopleFill />
            </div>
            <div className="add-people">
              <AiOutlineUp
                className="arrow-decrement"
                onClick={decrementHandler}
              />
              <input
                type="text"
                value={peopleValue}
                maxLength="1"
                onChange={(e) => setPeopleValue(e.target.value)}
              />
              <AiOutlineDown
                className="arrow-increment"
                onClick={IncrementHandler}
              />
            </div>
          </div>
        </div>

        <div className="flight-form__submit-btn">
          <button onClick={() => setFeatureAvailble(true)}>
            <span>Search Flight</span> <BsArrowRight className="arrow-next" />
          </button>
        </div>
      </form>
    </section>
  );
};
export default FlightSearchForm;
