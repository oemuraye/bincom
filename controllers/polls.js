import DB from "../database/connection.js";
import Prevention from "sqlstring";


export const homePage = async (req, res) => {
  //   res.render("create.ejs");
  DB.query(
    `SELECT * FROM lga`,
    (err, lga_info) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).render("index", {lga_info});
      }
    }
  );
};

export const getPollUnitResult = async (req, res) => {
  const { id } = req.params;
  try {
    if (lga_id === "none") {
      return res.status(403).json({message: "Select an Option"});
    }

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
  // console.log(lga_id);
  if (lga_id === "none") {
    return res.status(400).json({ message: "No LGA selected"})
  }
  
  try {
    DB.query(
      `SELECT * FROM polling_unit WHERE lga_id = ${lga_id}`,
      (err, pollingUnitResult) => {
        if (err) {
          console.log(err);
        } else {
          const polling_unit_id = pollingUnitResult.map(data => data.polling_unit_id)
            DB.query(
              `SELECT * FROM announced_pu_results `,
              (err, polling_unit_results) => {
                if (err) {
                  console.log(err);
                } else {
                  // console.log(polling_unit_results);
                  res.status(200).json({polling_unit_id, polling_unit_results});
                  // res.status(200).render("summary", {polling_unit_id, polling_unit_results});
                }
              }
              );
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
