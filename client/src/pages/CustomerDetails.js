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
               
                const timestamp = data.date;
                    const date = new Date(timestamp);
                    const options = { month: "long", day: "numeric", year: "numeric", hour: "numeric", minute: "numeric", hour12: true };
                    const formattedDate = date.toLocaleString("en-US", options);

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
