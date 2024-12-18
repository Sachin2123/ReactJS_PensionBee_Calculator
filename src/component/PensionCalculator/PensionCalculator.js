import React, { useState, useEffect } from "react";
import { Box, Grid, Typography } from "@mui/material";
import PropTypes from "prop-types";
import { SliderThumb } from "@mui/material/Slider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IOSSwitch from "../CustomStyles/IOSSwitch";
import AirbnbSlider from "../CustomStyles/AirbnbSlider";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Customized,
} from "recharts";
import { HideImage } from "@mui/icons-material";

function AirbnbThumbComponent(props) {
  const { children, ...other } = props;
  return (
    <SliderThumb {...other}>
      {children}
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
      <span className="airbnb-bar" />
    </SliderThumb>
  );
}

AirbnbThumbComponent.propTypes = {
  children: PropTypes.node,
};

const PensionCalculator = () => {
  // 1st Slider
  const [value, setValue] = useState([36, 67]);

  // 2nd Slider
  const [secvalue, setSecValue] = useState(50000);

  // 3rd Slider
  const [Thirdvalue, setThirdValue] = useState(26000);

  // 4th Slider
  const [fourthvalue, setFourthValue] = useState(350);

  // 5th Slider
  const [fifthvalue, setFifthValue] = useState(250);

  // 6th Slider
  const [sixthvalue, setSixthValue] = useState(0);

  // 7th Slider
  const [seventhvalue, setSeventhValue] = useState(172000);

  // 8th Slider
  const [eigthvalue, seteigthValue] = useState(18000);

  // State variables for pension calculation
  const [currentPension, setCurrentPension] = useState(50000);
  const [currentAge, setCurrentAge] = useState(36);
  const [retirementAge, setRetirementAge] = useState(67);
  const [threeexpectedReturnRate, setThreeExpectedReturnRate] = useState(3); //Expected Rate of Return :- 3%
  const [expectedReturnRate, setExpectedReturnRate] = useState(5); //Expected Rate of Return :- 5%
  const [sevenexpectedReturnRate, setSevenExpectedReturnRate] = useState(7); //Expected Rate of Return :- 7%
  const [personalContribution, setPersonalContribution] = useState(350);
  const [employerContribution, setEmployerContribution] = useState(250);
  const [oneTimeContribution, setOneTimeContribution] = useState(0);
  const [futurePensionPot, setFuturePensionPot] = useState(0); // Expected return of 5%
  const [futurePensionPotSeven, setFuturePensionPotSeven] = useState(0); // Expected return of 7%
  const [futurePensionPotThree, setFuturePensionPotThree] = useState(0); // Expected return of 3%
  const [includeStatePension, setIncludeStatePension] = useState(true);
  const [takeTaxFree, setTakeTaxFree] = useState(true);
  const [tooltipActive, setTooltipActive] = useState(true); // Set tooltip to active by default

  useEffect(() => {
    // Calculate the future pension pot
    const { F5, F3, F7 } = calculatePension(
      currentPension,
      currentAge,
      retirementAge,
      expectedReturnRate,
      personalContribution,
      employerContribution,
      oneTimeContribution,
      Thirdvalue,
      includeStatePension,
      takeTaxFree
    );
    setFuturePensionPot(Math.floor(F5));
    setFuturePensionPotSeven(Math.floor(F7));
    setFuturePensionPotThree(Math.floor(F3));
  }, [
    currentPension,
    currentAge,
    retirementAge,
    expectedReturnRate,
    personalContribution,
    employerContribution,
    oneTimeContribution,
    Thirdvalue,
    includeStatePension,
    takeTaxFree,
  ]);

  // Function for pension calculation
  const calculatePension = (
    currentPension,
    currentAge,
    retirementAge,
    expectedReturnRate,
    personalContribution,
    employerContribution,
    oneTimeContribution,
    Thirdvalue,
    includeStatePension,
    takeTaxFree
  ) => {
    const yearsToRetirement = retirementAge - currentAge;

    // Formula for Expected Rate of Return (5%)
    let F5 =
      (currentPension + oneTimeContribution) *
        Math.pow(1 + expectedReturnRate / 100, yearsToRetirement) +
      ((personalContribution + employerContribution) *
        12 *
        (Math.pow(1 + expectedReturnRate / 100, yearsToRetirement) - 1)) /
        (expectedReturnRate / 100);
    //  + oneTimeContribution * Math.pow(1 + expectedReturnRate / 100, yearsToRetirement);

    // Formula for Expected Rate of Return (3%)
    let F3 =
      (currentPension + oneTimeContribution) *
        Math.pow(1 + threeexpectedReturnRate / 100, yearsToRetirement) +
      ((personalContribution + employerContribution) *
        12 *
        (Math.pow(1 + threeexpectedReturnRate / 100, yearsToRetirement) - 1)) /
        (threeexpectedReturnRate / 100);
    //  + oneTimeContribution * Math.pow(1 + threeexpectedReturnRate / 100, yearsToRetirement);

    //formula for Expected Rate of Return (7%)
    let F7 =
      (currentPension + oneTimeContribution) *
        Math.pow(1 + sevenexpectedReturnRate / 100, yearsToRetirement) +
      ((personalContribution + employerContribution) *
        12 *
        (Math.pow(1 + sevenexpectedReturnRate / 100, yearsToRetirement) - 1)) /
        (sevenexpectedReturnRate / 100);
    //  + oneTimeContribution * Math.pow(1 + sevenexpectedReturnRate / 100, yearsToRetirement);

    //formula for Expected Rate of Return (5%)
    // Include state pension if toggled on
    // This is the standard formula Example :- State Pension = 9800 * yearsToRetirement
    if (includeStatePension) {
      const statePensionAmount = statePension * yearsToRetirement;
      F5 += statePensionAmount;
    }

    //formula for Expected Rate of Return (3%)
    // Include state pension if toggled on
    // This is the standard formula Example :- State Pension = 9800 * yearsToRetirement
    if (includeStatePension) {
      const statePensionAmount = statePension * yearsToRetirement;
      F3 += statePensionAmount;
    }

    //formula for Expected Rate of Return (7%)
    // Include state pension if toggled on
    // This is the standard formula Example :- State Pension = 9800 * yearsToRetirement
    if (includeStatePension) {
      const statePensionAmount = statePension * yearsToRetirement;
      F7 += statePensionAmount;
    }

    //formula for Expected Rate of Return (5%)
    // Take 25% tax-free lump sum at age 55
    if (takeTaxFree && currentAge < 55) {
      const taxFreeLumpSum = F5 * 0.25;
      F5 -= taxFreeLumpSum;
    }

    //formula for Expected Rate of Return (3%)
    // Take 25% tax-free lump sum at age 55
    if (takeTaxFree && currentAge < 55) {
      const taxFreeLumpSum = F3 * 0.25;
      F3 -= taxFreeLumpSum;
    }

    //formula for Expected Rate of Return (7%)
    // Take 25% tax-free lump sum at age 55
    if (takeTaxFree && currentAge < 55) {
      const taxFreeLumpSum = F7 * 0.25;
      F7 -= taxFreeLumpSum;
    }

    // console.log("F5:- ",F5.toFixed(0))
    // console.log("F3:- ",F3.toFixed(0))
    // console.log("F7:- ",F7.toFixed(0))

    return { F5, F3, F7 };
  };

  // Function for First Slider
  const handleChange = (event, newValue) => {
    let [currentAge, retirementAge] = newValue;

    // Ensure the difference does not exceed 46 years
    if (retirementAge - currentAge > 46) {
      // If the user drags the left handle (current age), limit retirement age
      if (currentAge !== value[0]) {
        setValue([currentAge, currentAge + 46]);
        setCurrentAge(currentAge);
        setRetirementAge(currentAge + 46);
      }
      // If the user drags the right handle (retirement age), limit current age
      else if (retirementAge !== value[1]) {
        setValue([retirementAge - 46, retirementAge]);
        setCurrentAge(retirementAge - 46);
        setRetirementAge(retirementAge);
      }
    } else {
      // if current age is 18 then the retirement age cannot go beyond 64 and below from 55
      if (currentAge === 18) {
        // Ensure retirement age doesn't go below 55
        if (retirementAge < 55) {
          retirementAge = 55; // Set retirement age to 55 if below 55
        }

        // Ensure retirement age doesn't exceed 64
        if (retirementAge > 64) {
          retirementAge = 64; // Set retirement age to 64 if above 64
        }
      }

      // Allow values within the range
      setValue([currentAge, retirementAge]);
      setCurrentAge(currentAge);
      setRetirementAge(retirementAge);
    }
  };

  // Function for Second Slider
  const handleSecChange = (event, newSecValue) => {
    setSecValue(newSecValue);
    setCurrentPension(newSecValue);
  };

  // Function for Third Slider
  const handleThirdChange = (event, newValue) => {
    setThirdValue(newValue);
    // setExpectedReturnRate(newValue);
  };

  // Function for Fourth Slider
  const handleFourthChange = (event, newValue) => {
    setFourthValue(newValue);
    setPersonalContribution(newValue);
  };

  // Function for Fifth Slider
  const handleFifthChange = (event, newValue) => {
    setFifthValue(newValue);
    setEmployerContribution(newValue);
  };

  // Function for Sixth Slider
  const handleSixthChange = (event, newValue) => {
    setSixthValue(newValue);
    setOneTimeContribution(newValue);
  };

  // Function for Seventh Slider
  // const handleSeventhChange = (event, newValue) => {
  //   setSeventhValue(newValue);
  // };

  // Function for Eigth Slider
  // const handleEigthChange = (event, newValue) => {
  //   seteigthValue(newValue);
  // };

  const [statePension, setStatePension] = useState(9800); // Example: £9,800 per year

  const handleIncludeStatePensionChange = (event) => {
    setIncludeStatePension(event.target.checked);
    // console.log("handleIncludeStatePensionChange:- ",event.target.checked)
  };

  const handleTakeTaxFreeChange = (event) => {
    setTakeTaxFree(event.target.checked);
    console.log("handleTakeTaxFreeChange:- ", event.target.checked);
  };

  // Retirement age is stored in retireAge, so that i can display "futurePensionPot" on their retirementAge.
  const retireAge = retirementAge;
  const PredictedAge = Math.floor(futurePensionPot / Thirdvalue + retireAge);

  const chartData = [];
  for (let age = currentAge; age <= 300; age++) {
    // 1st Point
    // line starts from current age
    if (age === currentAge) {
      chartData.push({
        age: `Age ${age}`,
        value1: "", // line start from current age
        value2: "",
        value3: "",
        hide: true,
      });
    }

    // 2nd Point
    // Handle the dip at age 55 if the tax-free option is enabled
    if (age === 55 && takeTaxFree === true) {
      const value1At55 = Math.ceil(futurePensionPot - futurePensionPot * 0.25);
      const value2At55 = Math.ceil(
        futurePensionPotThree - futurePensionPotThree * 0.25
      );
      const value3At55 = Math.ceil(
        futurePensionPotSeven - futurePensionPotSeven * 0.25
      );

      chartData.push({
        age: `Age ${age}`,
        value1: value1At55, // line dips due to 25% tax-free withdrawal
        value2: value2At55,
        value3: value3At55,
        hide: true,
      });

      // Add recovery at age 56 based on remaining growth
      const value1At56 = value1At55 * (1 + expectedReturnRate / 100);
      const value2At56 = value2At55 * (1 + threeexpectedReturnRate / 100);
      const value3At56 = value3At55 * (1 + sevenexpectedReturnRate / 100);

      // 3rd Point
      chartData.push({
        age: `Age ${age + 1}`,
        value1: value1At56 * 0.85, //  line rises again at age 56
        value2: value2At56 * 0.85,
        value3: value3At56 * 0.85,
        hide: true,
      });
    }

    // 4th Point
    // line will on peak on their retirementAge
    if (age === retireAge) {
      chartData.push({
        age: `Age ${age}`,
        value1: futurePensionPot, // line will on peak on their retirementAge
        value2: futurePensionPotThree,
        value3: futurePensionPotSeven,
        hide: false,
      });
    }

    // 5th Point
    // line will decrease and at their PredictedAge
    if (age === PredictedAge) {
      chartData.push({
        age: `Age ${age}`,
        value1: "", // line will decrease and at their PredictedAge
        value2: "",
        value3: "",
        hide: true,
      });
    }
  }
  console.log(chartData);

  // Custom Tooltip Component for Chart
  const CustomTooltip = ({ active, payload, label }) => {
    if (!active || !payload || payload.length === 0) return null;

    // Find peak data for retireAge
    const peakData = chartData.find((item) => item.age === `Age ${retireAge}`);
    const currentAgeData = payload[0].payload;

    // Only show the tooltip at retireAge or specific logic points
    if (currentAgeData.age === `Age ${retireAge}`) {
      return (
        <div
          className="custom-tooltip"
          style={{
            backgroundColor: "#fff",
            border: "2px solid #ccc",
            padding: "20px",
            textAlign: "left",
            borderRadius: "10px",
          }}
        >
          <div style={{ display: "flex", gap: "15px", fontWeight: "bold" }}>
            <span style={{ color: "#FF5F15" }}>ER at 5%</span>
            <span style={{ color: "#003366" }}>ER at 3%</span>
            <span style={{ color: "#FFB400" }}>ER at 7%</span>
          </div>
          <p
            className="value1"
            style={{ color: "#FF5F15", fontWeight: "bold" }}
          >
            <span
              style={{
                backgroundColor: "#FF5F15",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "5px",
              }}
            ></span>
            {`Current Projection £${peakData.value1.toLocaleString()}`}
          </p>
          <p
            className="value2"
            style={{ color: "#003366", fontWeight: "bold" }}
          >
            <span
              style={{
                backgroundColor: "#003366",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "5px",
              }}
            ></span>
            {`Current Projection £${peakData.value2.toLocaleString()}`}
          </p>
          <p
            className="value3"
            style={{ color: "#FFB400", fontWeight: "bold" }}
          >
            <span
              style={{
                backgroundColor: "#FFB400",
                width: "10px",
                height: "10px",
                borderRadius: "50%",
                display: "inline-block",
                marginRight: "5px",
              }}
            ></span>
            {`Current Projection £${peakData.value3.toLocaleString()}`}
          </p>
        </div>
      );
    }

    return null;
  };

  // Custom Dots for Specific Ages
  const CustomDot = (props) => {
    const { cx, cy, value, payload, dataKey } = props;

    // Check if age is 55, 56, or the specified age values and don't render the dot for those ages
    if (
      payload.age === "Age 55" ||
      payload.age === "Age 56" ||
      payload.age === `Age ${currentAge}` ||
      payload.age === `Age ${PredictedAge}`
    ) {
      return null; // Don't render dot for these ages
    }

    // Set the color based on the dataKey
    let dotColor = "#FF5F15"; // Default color for value1

    if (dataKey === "value2") {
      dotColor = "#003366"; // Navy Blue for value2
    } else if (dataKey === "value3") {
      dotColor = "#FFB400"; // Golden Yellow for value3
    }

    return (
      <circle
        cx={cx}
        cy={cy}
        r={6}
        fill={dotColor}
        stroke="#fff"
        strokeWidth={2}
      />
    );
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ minHeight: "100vh", padding: { xs: 2, sm: 4 } }}
    >
      <Box
        sx={{
          width: { xs: "100%", sm: "80%", md: "80%" },
          backgroundColor: "#fff",
          boxShadow: 2,
          borderRadius: 2,
          padding: { xs: 2, sm: 4 },
          mt: 3,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {/* Charts */}
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#D3D3D3" />
            <XAxis dataKey="age" />
            <YAxis
              tickFormatter={(value) => `£${(value / 1000).toFixed(0)}K`} // Format the amount as thousands with pound sign
            />
            <Tooltip content={<CustomTooltip />} />

            {/* Red Line */}
            <Line
              dot={<CustomDot />} // Use the custom dot here
              type="linear"
              dataKey="value1"
              stroke="#FF5F15"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
            {/* Navy Blue Line */}
            <Line
              dot={<CustomDot />} // Use the custom dot here
              type="linear"
              dataKey="value2"
              stroke="#003366" // Navy Blue for the line
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />

            {/* Golden Yellow Line */}
            <Line
              dot={<CustomDot />} // Use the custom dot here
              type="linear"
              dataKey="value3"
              stroke="#FFB400"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>

      <Box
        sx={{
          width: { xs: "100%", sm: "80%", md: "50%" },
          backgroundColor: "#fff",
          boxShadow: 2,
          borderRadius: 2,
          padding: { xs: 2, sm: 4 },
          mt: 3,
        }}
      >
        {/* Slider Section */}
        <Typography
          variant="h6"
          align="center"
          sx={{ fontWeight: "", mb: 5 }}
          gutterBottom
        >
          You're on track to have{" "}
          <span style={{ fontWeight: "700", fontSize: "23px" }}>
            £{futurePensionPot.toLocaleString()}
          </span>{" "}
          at retirement. If you take{" "}
          <span style={{ fontWeight: "700", fontSize: "23px" }}>
            £{Thirdvalue.toLocaleString()}
          </span>{" "}
          per year, this will last until age{" "}
          <span style={{ fontWeight: "700", fontSize: "23px" }}>
            {Math.floor(futurePensionPot / Thirdvalue) + retirementAge > 100 ? (
              <span style={{ fontWeight: "0 !important" }}>
                "beyond your 100th year."
              </span>
            ) : (
              Math.floor(futurePensionPot / Thirdvalue) + retirementAge
            )}
          </span>
        </Typography>

        {/* 1st Slider */}
        <Box sx={{ mt: 3 }}>
          <AirbnbSlider
            value={[currentAge, retirementAge]}
            onChange={handleChange}
            slots={{ thumb: AirbnbThumbComponent }}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `${value} Years`}
            min={18}
            max={85}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography>Current Age: {currentAge}</Typography>
            <Typography>Retirement Age: {retirementAge}</Typography>
          </Box>
        </Box>

        {/* 2nd Slider */}
        <Box sx={{ mt: 4 }}>
          <AirbnbSlider
            value={secvalue}
            onChange={handleSecChange}
            aria-label="Default"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `£${value.toLocaleString()}`}
            min={0}
            max={100000}
            step={secvalue < 40000 ? 500 : 1000}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography>Current Pension Pot</Typography>
            <Typography>£{secvalue.toLocaleString()}</Typography>
          </Box>
        </Box>

        {/* 3rd Slider */}
        <Box sx={{ mt: 4 }}>
          <AirbnbSlider
            onChange={handleThirdChange}
            value={Thirdvalue}
            sx={{ color: "#b0bdbf" }}
            aria-label="Default"
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `£${value.toLocaleString()}`}
            step={100}
            min={0}
            max={200000}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography>Desired Annual Retirement Income</Typography>
            <Typography>£{Thirdvalue.toLocaleString()}</Typography>
          </Box>
        </Box>

        {/* 4th Slider */}
        <Box sx={{ mt: 4 }}>
          <AirbnbSlider
            onChange={handleFourthChange}
            value={fourthvalue}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `£${value.toLocaleString()}`}
            min={0}
            max={5000}
            step={10}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography>Personal Monthly Contribution</Typography>
            <Typography>£{fourthvalue.toLocaleString()}</Typography>
          </Box>
        </Box>

        {/* 5th Slider */}
        <Box sx={{ mt: 4 }}>
          <AirbnbSlider
            onChange={handleFifthChange}
            value={fifthvalue}
            min={0}
            max={5000}
            step={10}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `£${value.toLocaleString()}`}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography>Employer Monthly Contribution</Typography>
            <Typography>£{fifthvalue.toLocaleString()}</Typography>
          </Box>
        </Box>

        {/* 6th Slider */}
        <Box sx={{ mt: 4 }}>
          <AirbnbSlider
            onChange={handleSixthChange}
            value={sixthvalue}
            min={0}
            max={160000}
            step={100}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `£${value.toLocaleString()}`}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography>Personal One-Off Contribution</Typography>
            <Typography>£{sixthvalue.toLocaleString()}</Typography>
          </Box>
        </Box>

        {/* 7th Slider */}
        {/* <Box sx={{ mt: 4 }}>
          <AirbnbSlider
            onChange={handleSeventhChange}
            value={seventhvalue}
            min={0}
            max={2000000}
            step={1000}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `£${value.toLocaleString()}`}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography>Comfortable Pension Pot</Typography>
            <Typography>£{seventhvalue.toLocaleString()}</Typography>
          </Box>
        </Box> */}

        {/* 8th Slider */}
        {/* <Box sx={{ mt: 4 }}>
          <AirbnbSlider
            onChange={handleEigthChange}
            value={eigthvalue}
            min={0}
            max={66000}
            step={500}
            valueLabelDisplay="auto"
            valueLabelFormat={(value) => `£${value.toLocaleString()}`}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mt: 1,
            }}
          >
            <Typography>Average UK</Typography>
            <Typography>£{eigthvalue.toLocaleString()}</Typography>
          </Box>
        </Box> */}

        {/* Switch Buttons */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mt: 5,
            mr: 3,
            ml: 3,
          }}
        >
          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                onChange={handleIncludeStatePensionChange}
                checked={includeStatePension}
              />
            }
            label="Include Full State Pension"
          />

          <FormControlLabel
            control={
              <IOSSwitch
                sx={{ m: 1 }}
                onChange={handleTakeTaxFreeChange}
                checked={takeTaxFree}
              />
            }
            label="Take 25% Tax-Free at 55"
          />
        </Box>
      </Box>
    </Grid>
  );
};

export default PensionCalculator;
