import DB from "../database/connection.js";
import Prevention from "sqlstring";


export const homePage = async (req, res) => {
  //   res.render("create.ejs");
  res.render("index");
};

export const getPollUnitResult = async (req, res) => {
  const { id } = req.params;
  try {
    DB.query(`SELECT * FROM polling_unit WHERE uniqueid = ${id}`, (err, pollingUnitDetails) => {
      if (err) {
        console.log(err);
      } else {
        DB.query(`SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid = ${id}`, (err, pollingUnitResult) => {
          if (err) {
            console.log(err);
          } else {
            // res.render("home.ejs", { pollingUnitDetails, pollingUnitResult });
            res.status(200).json({ pollingUnitDetails, pollingUnitResult });
            console.log({ pollingUnitDetails, pollingUnitResult });
          }
        });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};



export const getLga = async (req, res) => {
  DB.query(
    `SELECT * FROM lga`,
    (err, lgaList) => {
      if (err) {
        console.log(err);
      } else {
        // res.render("lga.ejs", { lgaList });
        res.status(200).json(lgaList);
        console.log(lgaList);
      }
    }
  );
};

export const getLgaSummary = async (req, res) => {
  
  const { lga_id } = req.body;
  try {
    DB.query(
      `SELECT * FROM polling_unit WHERE polling_unit_id = ${lga_id}`,
      (err, pollingUnitResult) => {
        if (err) {
          console.log(err);
        } else {
          const uniqueid = pollingUnitResult.map(data => data)
          res.status(200).render("summary", {uniqueid});
            // DB.query(
            //   `SELECT * FROM announced_pu_results where polling_unit_uniqueid = ${lga_id}`,
            //   (err, polling_unit_results) => {
            //     if (err) {
            //       console.log(err);
            //     } else {
            //       // console.log(polling_unit_results);
            //       res.status(200).render("summary", {polling_unit_results});
            //     }
            //   }
            // );
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send(error.message);
  }
};

export const storeResult = async (req, res) => {
  const data = req.body
  let errors = [];
  try {
    
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
