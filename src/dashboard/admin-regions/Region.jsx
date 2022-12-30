import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { getTeams } from "../../redux/actions/teamsAction";
import {
  getRegions,
  registerRegion,
  updateRegion,
} from "../../redux/actions/regionalFixturesAction";
import Table from "react-bootstrap/Table";
import Card from "react-bootstrap/Card";

const Region = () => {
  const allTeams = useSelector((state) => state.teamsReducer.allTeams);
  const allRegions = useSelector(
    (state) => state.regionFixturesReducer.regions
  );

  const [teams, setTeams] = useState([]);
  const [regionId, setRegionId] = useState("");
  const [selectedRegion, setSelectedRegion] = useState({});

  const dispatch = useDispatch();

  const { register, handleSubmit, setValue } = useForm();

  //   const [region, setRegion] = useState({
  //     name: "",
  //     description: "",
  //     image: "",
  //     players: "",
  //   });

  //   const handleInputChange = (e) => {
  //     setRegion((v) => ({ ...v, [e.target.name]: e.target.value }));
  //   };

  const handleRegionSubmit = (data) => {
    const obj = {
      ...data,
      teams: teams.map((t) => t.value),
    };
    console.log(obj);
    dispatch(registerRegion(obj));
  };

  // update regions

  const handleUpdate = (id, data) => {
    // const regionUpdate = allRegions.find((region) => region._id === id);
    // setSelectedRegion(regionUpdate);
    dispatch(updateRegion(id, data));
  };

  console.log(selectedRegion);

  useEffect(() => {
    if (selectedRegion?._id) {
      console.log(selectedRegion);
      setValue("name", selectedRegion.name);
      setValue("description", selectedRegion.description);
      setValue(
        "teams",
        selectedRegion.teams.map((team) => team.team)
      );
    }
  }, [selectedRegion]);

  useEffect(() => {
    dispatch(getTeams());
    dispatch(getRegions());
  }, [dispatch]);

  return (
    <div>
      <div className="container-lg">
        <div className="text-center">
          <p className="display-6 mt-3">Register Region</p>
        </div>
        <div className="row justify-content-around">
          <div className="col-lg-4 mt-5 ">
            <form
              action=""
              onSubmit={
                selectedRegion?._id
                  ? handleSubmit(handleUpdate)
                  : handleSubmit(handleRegionSubmit)
              }
            >
              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter Region:
                </label>
                {/* <select
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Field is required",
                    },
                  })}
                  id=""
                  className="form-select"
                >
                  <option value="">Select region</option>
                  <option value="Nairobi Region">Nairobi region</option>
                  <option value="Central Region">Central region</option>
                </select> */}
                <input
                  type="text"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Field is required",
                    },
                  })}
                  className="form-control"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Region Description:
                </label>

                <input
                  type="text"
                  {...register("description", {
                    required: {
                      value: true,
                      message: "Field is required",
                    },
                  })}
                  className="form-control"
                />
              </div>

              <div className="mb-2">
                <label htmlFor="" className="form-label">
                  Enter teams in this region:
                </label>

                <Select
                  value={teams}
                  onChange={(value) => setTeams(value)}
                  options={allTeams.map((p) => ({
                    label: p.team,
                    value: p._id,
                  }))}
                  isMulti
                />
              </div>
              <div className="d-flex justify-content-center my-3">
                {selectedRegion?._id ? (
                  <Button type="submit" variant="primary">
                    Update Region
                  </Button>
                ) : (
                  <Button type="submit" variant="primary">
                    Register Region
                  </Button>
                )}
              </div>
            </form>
          </div>
          <div className=" col-lg-5 ">
            <div className="lead text-center my-3">Registered Regions:</div>

            {allRegions &&
              allRegions.map((region) => (
                <Card className="my-4" key={region._id}>
                  <Card.Body>
                    <Card.Title className="text-center my-2">
                      {region.name}
                    </Card.Title>

                    {region.teams.map((team) => (
                      <ul>
                        <li key={team.team}>
                          <Card.Text>{team.team}</Card.Text>
                        </li>
                      </ul>
                    ))}

                    <Button
                      type="submit"
                      variant="primary"
                      onClick={() => setSelectedRegion(region._id)}
                    >
                      Edit Region
                    </Button>
                    {/* <Button type="submit" variant="danger" className="ms-5">
                      Delete Region
                    </Button> */}
                  </Card.Body>
                </Card>
              ))}
            {/* <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Region</th>
                  <th>Description</th>
               
                </tr>
              </thead>
              <tbody>
                {allRegions &&
                  allRegions.map((region) => (
                    <tr key={region._id}>
                      
                      <td>{region.name}</td>
                      <td>{region.teams.map((team) => (
                        <td>{team.name}</td>
                      ))} </td>
                    </tr>
                  ))}
              </tbody>
            </Table> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Region;
