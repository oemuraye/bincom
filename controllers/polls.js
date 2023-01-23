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

export const getLgaSummary = async (req, res) => {
  //   res.render("create.ejs");
  res.send("create.ejs");
};
