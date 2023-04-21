import {
  Accordion,
  AccordionPanel,
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
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
} from "grommet";
import PostTemplate from "./PostTemplate";
import { useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCarFromGarage, getModelsFromGarage } from "../api/carApi";

let vals = {
  model: '',
  year: null,
  query: ''
}
export const PostList = ({ title, posts, context }) => {
  const location = useLocation();
  let [models, setModels] = useState([]);
  let [modelList, setModelList] = useState([]);
  let [loaded, setLoaded] = useState(false);
  let [filters, setFilters] = useState(vals);
  let [postList, setPostList] = useState([])
  const addFilter = async (delta) => {
    setFilters({ ...filters, ...delta })
  }
  const applyFilters = async () => {
    setPostList(posts)
    getCarFromGarage(context.garage, filters.model, filters.year)
      .then(x => {
        console.log(postList)
        if (!!x) {
          setPostList(posts.filter(p =>
            p.car_id == x[0].car_id
          ))
        }
      })
  }
  const resetFilters = async () => {
    setFilters(vals)
    setPostList(posts);
  }
  useEffect(() => {
    setPostList(posts)
    if (context.location == "garage") {
      const loadModels = async () => getModelsFromGarage(context.garage).then(x => {
        if (!!x[0]) {
          x.forEach(m => {
            if (!models.includes(m)) {
              models.push(m.model)
            }
          })
        }
      })
      loadModels().then(() => {
        models = models.filter((m, index) => {
          return models.indexOf(m) === index;
        })
        setModelList(models);
        setLoaded(true)
      })
    }
  }, [])
  return (
    <>
      <Grid
        columns={['small', 'small', 'xsmall']}
        rows={['flex']}

      >
        <Box>
          <Select
            options={modelList}
            onChange={x => addFilter({ model: x.value })}>
          </Select>
        </Box>
        <Box margin={{ horizontal: 'small' }}>
          <Select
            options={Array.from({ length: 100 }, (v, k) => 123 - k + 1900)}
            onChange={x => addFilter({ year: x.value })}
          >
          </Select>
        </Box>
        <Box>
          <Button label="Clear"
            onClick={() => resetFilters()}></Button>
          <Button label="Apply Filters"
            onClick={() => applyFilters()}></Button>
        </Box>
      </Grid >
      <Table>
        <TableBody>
          {postList.map((post) => (
            <TableRow key={post.post_id}>
              <TableCell>
                <PostTemplate currPost={post}></PostTemplate>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};
