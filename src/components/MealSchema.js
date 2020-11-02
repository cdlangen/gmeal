/* eslint-disable no-script-url */
import React, { useState, useEffect } from "react";
import axios from "axios";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import Title from "./Title";
import { withStyles } from "@material-ui/core/styles";
// import Moment from "moment";
// import ShowAndTellEditItem from "./ShowAndTellEditItem";
import SvgIcon from "@material-ui/core/SvgIcon";
import dayjs from "dayjs"
import Typography from "@material-ui/core/Typography";

const StyledTableCell = withStyles((theme) => ({
  head: {
    fontWeight: 700,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

export default function MealSchema() {
  const [data, setData] = useState([]);
  const [query] = useState("10");
  const [open, setOpen] = useState(false);
  const [weekdays] = useState(["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"])
  const [meals] = useState([
    {
      "name": "Breakfast"
    },
    {
      "name": "Lunch"
    },
    {
      "name": "Dinner"
    }
  ])
  const [dateToShow, setDateToShow] = useState(dayjs())

  // ModalItems
  const [modalStart, setModalStart] = useState(null);
  const [modalPresenter, setModalPresenter] = useState(null);
  const [modalTopic, setModalTopic] = useState(null);
  const [modalId, setModalId] = useState(null);

  // const stitem = React.forwardRef(ShowAndTellEditItem);

  const handleClick = (event, item) => {
    setModalStart(item.start.dateTime);
    setModalPresenter(item.presenter);
    setModalTopic(item.topic);
    setModalId(item.id);
    setOpen(true);
  };

  async function handleDialogSave() {
    await patchData({
      presenter: modalPresenter,
      topic: modalTopic,
      id: modalId,
    });

    fetchData(false);
  }

  // function getStartDateTimeDurationFromEntry(entry) {
  //   const start = new Date(entry.start.dateTime);
  //   const end = new Date(entry.end.dateTime);

  //   entry.start["date"] = new Moment(entry.start.dateTime).format("ll");
  //   entry.start["time"] = new Moment(entry.start.dateTime).format("LT");
  //   entry["duration_ms"] = end - start;
  // }

  async function fetchData(ignore) {
    const result = await axios(
      window.SHOW_AND_TELL_URL + "/gcal/view/" + query,
      {
        headers: {
          Authorization:
            "Bearer " +
            window.gapi.auth2
              .getAuthInstance()
              .currentUser.get()
              .getAuthResponse().id_token,
        },
      }
    );

    // result.data.forEach(getStartDateTimeDurationFromEntry);

    if (!ignore) setData(result.data);

    return result;
  }

  async function patchData(payload) {
    const entry = await axios.patch(
      window.SHOW_AND_TELL_URL + "/gcal/event",
      payload,
      {
        headers: {
          Authorization:
            "Bearer " +
            window.gapi.auth2
              .getAuthInstance()
              .currentUser.get()
              .getAuthResponse().id_token,
        },
      }
    );

    return entry;
  }

  useEffect(() => {
    let ignore = false;

    fetchData(ignore);
    return () => {
      ignore = true;
    };
  }, [query]);


  const day = dateToShow.startOf('week')
  console.log(day)


  return (
    // <React.Fragment>
      <div>
      <p>{day.format('YYYY-MM-DDTHH:mm:ssZ[Z]') }</p>
  
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            {weekdays.map((item) => (
              <StyledTableCell>{item}</StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {meals.map((item) => (
            <TableRow
              hover
              key={item.id}
              onClick={(event) => handleClick(event, item)}
            >
              <TableCell>
                {item.name}
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
              <TableCell>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* <div className={classes.seeMore}>
        <Link color="primary" href="javascript:;">
          See more orders
        </Link>
      </div> */}
      

      {/* <ShowAndTellEditItem
        modalStart={modalStart}
        modalPresenter={modalPresenter}
        modalTopic={modalTopic}
        setModalPresenter={setModalPresenter}
        setModalTopic={setModalTopic}
        setOpen={setOpen}
        handleDialogSave={handleDialogSave}
        open={open}
      ></ShowAndTellEditItem> */}
    {/* // </React.Fragment> */}
    </div>
  );
}
