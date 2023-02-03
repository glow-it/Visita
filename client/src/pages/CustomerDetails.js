import React, { useEffect, useState } from "react";
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "@chakra-ui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import apiKeys from "../Api/apiKeys";

function CustomerDetails() {
  let params = useParams();
  let company_name = params.comp_name;
  let [cardDatas, setCardDatas] = useState([]);

  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });

    axios.get(`${apiKeys.server_url}/card/` + company_name).then((response) => {
      setCardDatas(response.data);
    });
  });

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="">
        <Thead>
          <Tr className="font-bold">
            <Th className="font-bold">Name</Th>
            <Th className="font-bold">Phone number</Th>
            <Th className="font-bold">Date</Th>
          </Tr>
        </Thead>

        <Tbody className="font-medium">
          {cardDatas.customer_details &&
            cardDatas.customer_details
              .filter((data, index) => {
                return index != 0;
              })
              .map((data) => {
                var date1, date2;
                //define two date object variables with dates inside it
                date1 = data.date;
                date2 = new Date();

                //calculate time difference
                var time_difference = date2.getTime() - parseInt(date1);

                //calculate days difference by dividing total milliseconds in a day
                var days_difference = time_difference / (1000 * 60 * 60 * 24);

              
  

                let daysAgo = parseInt(days_difference);
                let date = new Date();
                date.setDate(date.getDate() - daysAgo);
                let formattedDate = new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                }).format(date);

                return (
                  <Tr className="font-medium">
                    <Td>{data.name}</Td>
                    <Td>+91{data.phone_no}</Td>
                    <Td>{formattedDate}</Td>
                  </Tr>
                );
              })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default CustomerDetails;
