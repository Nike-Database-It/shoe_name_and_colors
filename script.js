import http from "k6/http";
import { sleep } from "k6";

const id = Math.floor(Math.random()*1000000);

export let options = {
  vus: 1000,
  duration: "20s",
};

export default function () {
  http.get(`http://localhost:3006/:${id}/colors`);
  sleep(1);
};
