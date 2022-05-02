import React from "react";
import {Box, Card, CardContent, CardHeader, Container, Grid, Typography} from "@mui/material";
import DashBoard from "../dashboard/dash-board";
import Layout from "../layout/layout";
import { StaticImage } from "gatsby-plugin-image";


function Index() {
    const indexText = 'I am a passionate Firmware and Software Engineer with a special focus on quality. ' +
        'My experience range from small electromechanical devices to large scale enterprise applications. ' +
        'With a background as mechanic as well as electronic and software engineering I developed a ' +
        'problem-solving engineering mindset that helps me to find exceptional solutions for a big range of projects.'
    return <>
      <Layout>
        <Box
            component="main"
            sx={{
                flexGrow: 1,
            }}
        >
            <Container maxWidth={false}>
                <Grid
                    container
                    spacing={3}
                    item
                    direction="row"
                    justifyContent="flex-start"
                    alignItems="stretch"
                >
                    <Grid
                        item
                        lg={6}
                        alignItems="stretch"
                    >
                        <Card variant="outlined" sx={{border: 0}}>
                            <CardHeader title={
                                <Typography variant="h4" align="left">
                                    Welcome to my Page
                                </Typography>}
                            />
                            <CardContent>
                                <Typography align="left">
                                    {indexText}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        item
                        lg={6}
                        alignItems="stretch"
                    >
                        <Card variant="outlined" sx={{border: 0}}>
                            <CardContent>
                              <StaticImage src='../images/alexandre-debieve-FO7JIlwjOtU-unsplash.jpg'
                                           alt="Electronic board (by Alexandre Debieve)"/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Container>
        </Box>


        <DashBoard/>
      </Layout>
    </>;
}

export default Index;
