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

function CustomerDetails() {
  let params = useParams();
  let company_name = params.comp_name;
  let [cardDatas, setCardDatas] = useState([]);

  useEffect(() => {
    document.querySelectorAll("header").forEach((elem) => {
      elem.style.display = "none";
    });

    axios.get("http://localhost:3005/card/" + company_name).then((response) => {
      setCardDatas(response.data);
    });
  });

  return (
    <TableContainer>
      <Table variant="striped" colorScheme="teal">
        <Thead>
          <Tr className="font-visita-bold">
            <Th className="font-visita-bold">Name</Th>
            <Th className="font-visita-bold">Phone number</Th>
            <Th className="font-visita-bold">Date</Th>
          </Tr>
        </Thead>

        <Tbody className="font-visita-medium">
          {cardDatas.customer_details && cardDatas.customer_details.filter((data,index)=> {
            return index != 0
          }).map((data) => {
              var date1, date2;
              //define two date object variables with dates inside it
              date1 = data.date;
              date2 = new Date();

              //calculate time difference
              var time_difference = date2.getTime() - parseInt(date1);

              //calculate days difference by dividing total milliseconds in a day
              var days_difference = time_difference / (1000 * 60 * 60 * 24);
              let days;

              if (Math.trunc(days_difference) == 0) {
                days = "today";
              } else if (Math.trunc(days_difference) == 1) {
                days = "1 day ago";
              } else {
                days = Math.trunc(days_difference) + " days ago";
              }

              return (
                <Tr className="font-visita-medium">
                  <Td>{data.name}</Td>
                  <Td>+91{data.phone_no}</Td>
                  <Td>{days}</Td>
                </Tr>
              );
            })}
        </Tbody>
      </Table>
    </TableContainer>
  );
}

export default CustomerDetails;
