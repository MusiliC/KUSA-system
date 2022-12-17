// import React, { useEffect } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import Table from "react-bootstrap/Table";
// import { getResults } from "../../redux/actions/resultsActions";
// import { getScorers } from "../../redux/actions/playerActions";
// import { getTeams } from "../../redux/actions/teamsAction";
// import { Document, Page, Text, Image, StyleSheet } from "@react-pdf/renderer";

// const imgUrl = "http://localhost:5000/static";

// const ReportGenerator = () => {
//   // teams
//   const teams = useSelector((state) => state.teamsReducer.allTeams);

//   //handling Results

//   const results = useSelector((state) => state.resultsReducer.results);

//   //handling top scorer

//   const topScorer = useSelector((state) => state.playerReducer.players);

//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(getResults());
//     dispatch(getScorers());
//   }, [dispatch]);

//   useEffect(() => {
//     dispatch(getTeams());
//   }, [dispatch]);

//   return (
//   <Document>
//     <Page>

//     </Page>
//   </Document>
//   );
// };

// export default ReportGenerator;
