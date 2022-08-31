import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; 
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';

import "../admin.css"

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
  
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
);

function Talep() {

    const [chartData, setChartData] = useState({
        datasets: [],
    })

    const [chartOptions, setChartOptions] = useState({})

    useEffect(() => {
        setChartData({
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [
                {
                label: 'Rainfall',
                fill: false,
                lineTension: 0.5,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [65, 59, 80, 81, 56]
                }
            ]
        })
        setChartOptions({
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                },
            },
            title: {
                display: true,
                text: "DENEME BAŞLIK"
            }
        })
    }, [])

    return (
        <>
        <div className="container">
            <nav className="admin-header d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-2 my-3 border-bottom shadow p-3 bg-body rounded">
                <ul className="nav col-12 col-md-auto">
                    <li>
                        <Link to="/admin" className="nav-link text-primary">
                            <i className="fa-solid fa-gauge me-1 d-none d-sm-inline"></i> Panel
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/talepler" className="nav-link text-danger">
                            <i className="fa-solid fa-hand-holding-medical me-1 d-none d-sm-inline"></i> Talepler
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/imkanlar" className="nav-link text-success">
                            <i className="fa-solid fa-hand-holding-hand me-1 d-none d-sm-inline"></i> İmkanlar
                        </Link>
                    </li>
                    <li>
                        <Link to="/admin/kullanici" className="nav-link text-warning">
                            <i className="fa-solid fa-user-group me-1 d-none d-sm-inline"></i> Kullanıcılar
                        </Link>
                    </li>
                </ul>
            </nav>
            <section className="mb-2 border-bottom shadow pt-4 px-2 mb-5 bg-body rounded">
            <div className="container">
                <div className="row d-flex justify-content-between">
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div className="col-md-12 shadow p-4 mb-5 bg-body rounded d-flex justify-content-between align-items-center">
                            <div className="col-8">
                                <h6 className="d-block"> Toplam Ziyaretçi</h6>
                                <h3 className="text-success">12,874</h3>    
                            </div>
                            <div className="col-4 d-flex justify-content-end align-items-center">
                                <div className="d-flex justify-content-center align-items-center circle text-white bg-success rounded-circle">
                                    <i className="fa-solid fa-xl fa-chart-line"></i>                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div className="col-md-12 shadow p-4 mb-5 bg-body rounded d-flex justify-content-between align-items-center">
                            <div className="col-8">
                                <h6 className="d-block"> Yeni Kullanıcı</h6>
                                <h3 className="text-success">209</h3>    
                            </div>
                            <div className="col-4 d-flex justify-content-end align-items-center">
                                <div className="d-flex justify-content-center align-items-center circle text-white bg-warning rounded-circle">
                                    <i className="fa-solid fa-xl fa-image-portrait"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div className="col-md-12 shadow p-4 mb-5 bg-body rounded d-flex justify-content-between align-items-center">
                            <div className="col-8">
                                <h6 className="d-block"> Toplam Talep</h6>
                                <h3 className="text-success">1713</h3>    
                            </div>
                            <div className="col-4 d-flex justify-content-end align-items-center">
                                <div className="d-flex justify-content-center align-items-center circle text-white bg-danger rounded-circle">
                                    <i className="fa-solid fa-xl fa-hand-holding-medical"></i>                                
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-12 col-md-6 col-lg-4 col-xl-3">
                        <div className="col-md-12 shadow p-4 mb-5 bg-body rounded d-flex justify-content-between align-items-center">
                            <div className="col-8">
                                <h6 className="d-block"> Toplam İmkan</h6>
                                <h3 className="text-success">344</h3>    
                            </div>
                            <div className="col-4 d-flex justify-content-end align-items-center">
                                <div className="d-flex justify-content-center align-items-center circle text-white bg-primary rounded-circle">
                                    <i className="fa-solid fa-xl fa-hand-holding-hand"></i>                                
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                    
            <div className="px-3 py-4 w-100" id="myChart" width="900" height="330">
                <div className="row">
                    <div className="col-lg-6 mb-3">
                        <div className="row d-flex justify-content-center align-items-center">
                            <h6 className="text-center text-success">Aylık Ziyaretçi</h6>
                            <div className="col-11 mb-5 p-3 img-thumbnail">
                                <Line options={chartOptions} data={chartData} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-3">
                        <div className="row d-flex justify-content-center align-items-center">
                            <h6 className="text-center text-warning">Haftalık Yeni Kullanıcı</h6>
                            <div className="col-11 mb-5 p-3 img-thumbnail">
                                <Bar options={chartOptions} data={chartData} />                            
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-1">
                        <div className="row d-flex justify-content-center align-items-center">
                            <h6 className="text-center text-danger">Yardım Talepleri ve İmkanları</h6>
                            <div className="col-11 mb-2 p-3 img-thumbnail">
                                <Doughnut options={chartOptions} data={chartData} />
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 mb-1">
                        <div className="row d-flex justify-content-center align-items-center">
                            <h6 className="text-center text-primary">Yardım Talepleri ve İmkanları</h6>
                            <div className="col-11 mb-2 p-3 img-thumbnail">
                                <Pie options={chartOptions} data={chartData} />                            
                            </div>
                        </div>
                    </div>
                </div>
            </div>
                
            </section>
        </div>
        </>
    )
}

export default Talep