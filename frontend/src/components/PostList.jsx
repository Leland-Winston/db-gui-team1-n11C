import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Data,
  DataTable,
  Heading,
  Select,
  Grid,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHeader,
  Tab,
  Tabs,
  ResponsiveContext,
} from "grommet";
import { DataSearch, TextInput } from "grommet/components";
import { Search } from "grommet-icons";
import PostTemplate from "./PostTemplate";
import { useLocation, useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import {
  getCarFromGarage,
  getIdsFromModel,
  getModelsFromGarage,
} from "../api/carApi";

let vals = {
  model: "",
  year: null,
  query: "",
};
export const PostList = ({ posts, context }) => {
  const location = useLocation();
  let size = useContext(ResponsiveContext);
  let [models, setModels] = useState([]);
  let [modelList, setModelList] = useState([]);
  let [loaded, setLoaded] = useState(false);
  let [filters, setFilters] = useState(vals);
  let [postList, setPostList] = useState([]);
  const addFilter = async (delta) => {
    setFilters({ ...filters, ...delta });
  };

  const applyFilters = async () => {
    setPostList(posts);
    if (filters.year != null) {
      getCarFromGarage(context.garage, filters.model, filters.year).then(
        (x) => {
          console.log(postList);
          if (!!x) {
            setFilteredPosts(posts.filter((p) => p.car_id == x[0].car_id));
          }
        }
      );
    } else {
      getIdsFromModel(context.garage, filters.model).then((x) => {
        console.log(x);
      });
    }
  };
  const resetFilters = async () => {
    document.getElementById("test");
    setFilters(vals);
    setPostList(posts);
  };
  useEffect(() => {
    setPostList(posts);
    const load = async () => {
      if (context.location == "garage") {
        const loadModels = async () =>
          getModelsFromGarage(context.garage).then((x) => {
            if (!!x[0]) {
              x.forEach((m) => {
                if (!models.includes(m)) {
                  models.push(m.model);
                }
              });
            }
          });
        loadModels().then(() => {
          setModelList(
            models.filter((m, index) => {
              return models.indexOf(m) === index;
            })
          );
          setModelList(models);
        });
      }
    };
    load().then(() => setLoaded(true));
  }, []);

  const getFilteredPosts = () => {
    let _filteredPosts = posts.filter(
      (post) =>
        post.title.includes(searchText) ||
        post.content.includes(searchText) ||
        post.author.includes(searchText)
    );
    setFilteredPosts(_filteredPosts);
  };
  const [searchText, setSearchText] = useState("");
  const [filteredPosts, setFilteredPosts] = useState(posts);
  useEffect(() => {
    getFilteredPosts();
  }, [searchText]);

  return (
    loaded && (
      <>
        {context.location == "garage" && (
          <Grid columns={["small", "small"]} rows={["flex"]}>
            <Box pad={{top: "small", start: "small"}}>
              <Select
                options={modelList}
                onChange={(x) => addFilter({ model: x.value })}
                placeholder="model"
              ></Select>
            </Box>
            <Box margin={{ horizontal: "small" }} pad={{top: "small"}}>
              <Select
                id="test"
                options={Array.from({ length: 100 }, (v, k) => 123 - k + 1900)}
                onChange={(x) => addFilter({ year: x.value })}
                placeholder="year"
              ></Select>
            </Box>
            <Box direction="row" pad={"small"}>
            <Button
                label="Apply Filters"
                onClick={() => applyFilters()}
                fill
                primary
              ></Button>
              <Button label="Clear" onClick={() => resetFilters()}></Button>
              
            </Box>
          </Grid>
        )}
        <Box width={"medium"} margin={"small"}>
          <TextInput
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            icon={<Search />}
            placeholder="search for user or keyword"
          ></TextInput>
        </Box>
        <Box margin={{top: "medium"}}>
          <Table>
            <TableBody>
              {filteredPosts.map((post) => (
                <TableRow key={post.post_id}>
                  <TableCell>
                    <PostTemplate currPost={post}></PostTemplate>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </>
    )
  );
};
