import React, { useEffect, useState } from "react";
import { AxiosResponse } from "axios";
import BarChart from "./ACEBarChart";
import LineChart from "./ACELineChart";
import PieChart from "./ACEPieChart";
import { ApiResponse } from "../../types/apiResponce";
import { CountryResponse } from "../../types/countryResponse";
import { CompanyResponse } from "../../types/companyResponce";
import { JobDetailsResponse } from "../../types/jobdetailsResponce";
import "./ACEDashboard.css";
import axiosInstance from "../../services/axios.service";
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import 'react-data-grid/lib/styles.css';
import DataGrid from 'react-data-grid';
import Table from 'react-bootstrap/Table';
const BASE_URL = process.env.BASE_URL || "http://localhost:5000/api";
const V1 = "v1.0";
const ACEDashboard=() =>{
  const [countries, setCountries] = useState<CountryResponse[]>([]);
  const [companies, setCompanies] = useState<CompanyResponse[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<number>(0);
  const [selectedCompany, setSelectedCompany] = useState<number>(0);
  const [pieChartData, setPieChartData] = useState<any>({
    labels: [],
    data: [],
  });
  const [data, getData] = useState<JobDetailsResponse[]>([]);

  const [barChartData, setBarChartData] = useState<any>({
    labels: [],
    data: [],
  });

  const [lineChartData, setLineChartData] = useState<any>({
    labels: [],
    data: [],
  });
  const URL = "https://jsonplaceholder.typicode.com/posts";

  useEffect(() => {
    fetchData();
  }, []);
  useEffect(() => {
    getCountryList();
  }, []); 
  useEffect(() => {
    getJobdetailData();
  }, []);
 /*  dropdown trigger */
 /*    useEffect(() => {
    getJobdetailData();
  }, [selectedCountry]); 
  useEffect(() => {
    getJobdetailData();
  }, [selectedCompany]);  */
  useEffect(() => {
    getCompanyData();
  }, [selectedCountry]);

  const handleClick = (e: any) => {
    e.preventDefault();
    getJobdetailData();
    fetchData();
    }

  const fetchData = () => {
    return axiosInstance
    .get(`${BASE_URL}/${V1}/jobdetails?country=${selectedCountry}&company=${selectedCompany}`)
    .then((response: AxiosResponse<ApiResponse<JobDetailsResponse[]>>) => {
      console.log(response);
        getData(response.data.data);
    });

     
  };
  function getCompanyData(){
    axiosInstance
      .get(`${BASE_URL}/${V1}/company?country=${selectedCountry}`)
      .then((response: AxiosResponse<ApiResponse<CompanyResponse[]>>) => {
        setCompanies(response.data.data);
      });

  }
  
   function getJobdetailData() {
    debugger;
    return axiosInstance
      .get(`${BASE_URL}/${V1}/jobdetails?country=${selectedCountry}&company=${selectedCompany}`)
      .then((response: AxiosResponse<ApiResponse<any>>) => {
        console.log(response.data.data);
        const pieChartResult: any[] = [];
        const barChartResult: any[] = [];
        const lineChartResult: any[] = [];
        if (response.data.data) {
          response.data.data.reduce(function (res: any, value: any) {
            if (!res[value.jobrole]) {
              res[value.jobrole] = { jobrole: value.jobrole, newattendcount: 0 };
              pieChartResult.push(res[value.jobrole]);
            }
            res[value.jobrole].newattendcount += value.newattendcount;
            return res;
          }, {});
          response.data.data.reduce(function (res: any, value: any) {
            if (!res[value.year]) {
              res[value.year] = { year: value.year, leavecount: 0 };
              barChartResult.push(res[value.year]);
            }
            res[value.year].leavecount += value.leavecount;
            return res;
          }, {});

          response.data.data.reduce(function (res: any, value: any) {
            if (!res[value.year]) {
              res[value.year] = { year: value.year, newattendcount: 0 };
              lineChartResult.push(res[value.year]);
            }
            res[value.year].newattendcount += value.newattendcount;
            return res;
          }, {});


        }
        setPieChartData({
          labels: pieChartResult.map((x) => x.jobrole),
          data: pieChartResult.map((x) => x.newattendcount),
        });

        setBarChartData({
          labels: barChartResult.map((x) => x.year),
          data: barChartResult.map((x) => x.leavecount),
        });

        setLineChartData({
          labels: lineChartResult.map((x) => x.year),
          data: lineChartResult.map((x) => x.newattendcount),
        });
      });
  } 

  function getCountryList() {
    axiosInstance
      .get(`${BASE_URL}/${V1}/country`)
      .then((response: AxiosResponse<ApiResponse<CountryResponse[]>>) => {
        setCountries(response.data.data);
      });
  }


   return (
  
  <Row className="justify-content-md-center">
   <Col  className="shadow p-4 mb-4 d-none  d-sm-block col-2 mr-5">
   <Row>
    <p>Country</p>
        <select 
          value={selectedCountry}
          onChange={(e) => {
            setSelectedCountry(parseInt(e.target.value));
          }}
          className="selectbox"
        >
          <option value={0}>Select All </option>
          {Array.isArray(countries) &&
            countries.map((x) => {
              return <option value={x.id}>{x.name}</option>;
            })}
        </select>
   </Row>
  
   <Row>
   <p>Company</p>
        <select
          value={selectedCompany}
          onChange={(e) => {
            setSelectedCompany(parseInt(e.target.value));
          }}
          className="selectbox"
        >
          <option value={0}>Select All</option>
          {Array.isArray(companies) &&
            companies.map((x) => {
              return <option value={x.id}>{x.companyname}</option>;
            })}
        </select>
   </Row>
   <Row>
   <button
          className="button"
          onClick={handleClick}
          >
            Apply
          </button>
   </Row>
    </Col>
    <Col  className="shadow p-4 mb-4 d-none d-sm-block col-10 ml-12">

    <Row>
    <Col  className="shadow-sm mb-4 d-none d-sm-block col-4 ml-12">
    {"Total Employees "}
          <PieChart
            labels={pieChartData.labels ? pieChartData.labels : []}
            data={pieChartData.data ? pieChartData.data : []}
          />
    </Col>
    <Col  className="shadow-sm mb-4 d-none d-sm-block col-4 ml-12">
    {" "}
          <BarChart 
          labels={barChartData.labels ? barChartData.labels : []}
          data={barChartData.data ? barChartData.data : []}
          />
    </Col>
    <Col  className="shadow-sm mb-4 d-none d-sm-block col-4 ml-12">
    {" "}
          <LineChart 
          labels={lineChartData.labels ? lineChartData.labels : []}
          data={lineChartData.data ? lineChartData.data : []}
          />
    </Col>
    </Row> 
    <Row  >
    <Col  className="shadow-sm mb-10 d-none d-sm-block col-12">
    <p className="p1">Yearly Recruitment </p>
    <div className="table-wrapper-scroll-y my-custom-scrollbar">
    <Table className="d-sm-block col-12">

      <tbody className="shadow-sm mb-10 d-none d-sm-block col-12">
        <tr>
          <th>ID</th>
          <th>Job Role</th>
          <th>Recruitment Count</th>
          <th>Year</th>
        </tr>
        {data.map((item, i) => (
          <tr key={i}>
            <td>{item.id}</td>
            <td>{item.jobrole}</td>
            <td>{item.newattendcount}</td> 
            <td>{item.year}</td>
          </tr>
        ))}
      </tbody>
</Table>
    </div>
    
    </Col>
 
    </Row> 
          
    </Col>
  </Row>
  );
}; 


export default ACEDashboard;