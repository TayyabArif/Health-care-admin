import { format } from 'date-fns';
import { v4 as uuid } from 'uuid';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useRouter } from 'next/router';

import {
  Box,
  Button,
  Card,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip
} from '@mui/material';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SeverityPill } from '../severity-pill';
import { useEffect, useState } from 'react';

const orders = [
  {
    id: uuid(),
    ref: 'CDD1049',
    amount: 30.5,
    customer: {
      name: 'Ekaterina Tankova'
    },
    createdAt: 1555016400000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1048',
    amount: 25.1,
    customer: {
      name: 'Cao Yu'
    },
    createdAt: 1555016400000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1047',
    amount: 10.99,
    customer: {
      name: 'Alexa Richardson'
    },
    createdAt: 1554930000000,
    status: 'refunded'
  },
  {
    id: uuid(),
    ref: 'CDD1046',
    amount: 96.43,
    customer: {
      name: 'Anje Keizer'
    },
    createdAt: 1554757200000,
    status: 'pending'
  },
  {
    id: uuid(),
    ref: 'CDD1045',
    amount: 32.54,
    customer: {
      name: 'Clarke Gillebert'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  },
  {
    id: uuid(),
    ref: 'CDD1044',
    amount: 16.76,
    customer: {
      name: 'Adam Denisov'
    },
    createdAt: 1554670800000,
    status: 'delivered'
  }
];

export const LatestOrders = (props) => {
  const [labTests, setLabTests] =useState()
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter();

  const handleClick = () => {
    router.push('/labtests');
  };
  useEffect(() => {
    async function getData() {
      try{
        const res = await fetch('https://health-care-server-sooty.vercel.app/getlabtests')
        const data = await res.json()
        setLabTests(data)
        setIsLoading(false)
        console.log('response',data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getData()
  }, [])
  if (labTests?.length) {
    let myAllLabTests = labTests
     let newArray = myAllLabTests.slice(-10);
      orders = newArray.map(data => ({
        id: data?.Id,
        name: data?.name,
        contactnumber: data?.contactnumber,
        branch: data?.branche,
        status: data?.status,
        title: data?.title,
    }))
  }

  return(
    <Card {...props}>
      <CardHeader title="Latest Orders" />
      <PerfectScrollbar>
        <Box sx={{ minWidth: 650 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  ID
                </TableCell>
                <TableCell>
                  Name
                </TableCell>
                <TableCell>
                  Contact
                </TableCell>
                <TableCell>
                  Title
                </TableCell>
                <TableCell>
                  Branch
                </TableCell>
                <TableCell>
                  Status
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((order) => (
                <TableRow
                  hover
                  key={order.id}
                >
                  <TableCell>
                    {order.id}
                  </TableCell>
                  <TableCell>
                    {order.name}
                  </TableCell>
                  <TableCell>
                    {order.contactnumber}
                  </TableCell>
                  <TableCell>
                    {order.title}
                  </TableCell>
                  <TableCell>
                    {order.branch}
                  </TableCell>
                  <TableCell>
                    <SeverityPill
                      color={(order.status === 'completed' && 'success')
                      || (order.status === 'pending' && 'error')
                      || 'warning'}
                    >
                      {order.status}
                    </SeverityPill>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          p: 2
        }}
      >
        <Button
          color="primary"
          endIcon={<ArrowRightIcon fontSize="small" />}
          size="small"
          variant="text"
          onClick={handleClick}
        >
          View all
        </Button>
      </Box>
    </Card>
  )
};
