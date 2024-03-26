"use client";

import { Booking } from "@/models/booking";
import {
  Chart as ChartJS,
  Tooltip,
  CategoryScale,
  LinearScale,
  BarElement,
} from "chart.js";
import { FC } from "react";
import { Bar } from "react-chartjs-2";

ChartJS.register(Tooltip, CategoryScale, LinearScale, BarElement);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: true,
      text: "Chart Bar Chart",
    },
  },
};

const Chart: FC<{ userBookings: Booking[] }> = ({ userBookings }) => {
  const labels = userBookings.map((booking) => booking.hotelRoom.name);
  const amountspent = userBookings.map((booking) => booking.totalPrice);
  return (
    <Bar
      options={options}
      data={{
        labels,
        datasets: [
          {
            label: "Amount Spent",
            data: amountspent,
            borderWidth: 1,
            backgroundColor: "#f27405",
            hoverBackgroundColor: "#f2c641",
          },
        ],
      }}
    />
  );
};

export default Chart;
