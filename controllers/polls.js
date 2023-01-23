import DB from "../database/connection.js";
import Prevention from "sqlstring";


export const homePage = async (req, res) => {
  //   res.render("create.ejs");
  res.send("create.ejs");
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
  const lga_id = req.params.id;
  // const lga_id = req.body
  try {
    DB.query(
      `SELECT * FROM polling_unit WHERE lga_id = ${lga_id}`,
      (err, pollingUnitResult) => {
        if (err) {
          console.log(err);
        } else {
          const uniqueid = pollingUnitResult.map(data => data.uniqueid)
          console.log(uniqueid);
           res.status(200).json(uniqueid);
            // DB.query(
            //   `SELECT * FROM announced_pu_results WHERE polling_unit_uniqueid = ${uniqueid[0]}`,
            //   (err, go) => {
            //     if (err) {
            //       console.log(err);
            //     } else {
            //       // res.render("home.ejs", { go });
            //       res.status(200).json(go);
            //       console.log(go);
            //     }
            //   }
            // );          
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).send({ message: "Internal Server Error" });
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
