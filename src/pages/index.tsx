import React from "react";
import {Box, Card, CardContent, CardHeader, Container, Grid, Typography} from "@mui/material";
import DashBoard from "../dashboard/dash-board";
import Layout from "../layout/layout";
import { StaticImage } from "gatsby-plugin-image";

function Index() {
    const indexText = 'I am a passionate firmware and software engineer with a strong focus on quality. ' +
        'My experience ranges from small electromechanical devices to large-scale enterprise applications. ' +
        'With a background in mechanics, electronics and software engineering, I have developed a ' +
        'problem-solving mindset that helps me find excellent solutions for a wide range of projects.'
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
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'stretch',
                    }}
                    size={{xs: 12}}
                >
                    <Grid
                        size={{xs: 12, lg: 6}}
                        sx={{display: 'flex'}}
                    >
                        <Card variant="outlined" sx={{border: 0, width: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardHeader title={
                                <Typography variant="h4" align="left">
                                    Welcome to my Page
                                </Typography>}
                            />
                            <CardContent sx={{ flex: 1 }}>
                                <Typography align="left">
                                    {indexText}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid
                        size={{xs: 12, lg: 6}}
                        sx={{display: 'flex'}}
                    >
                        <Card variant="outlined" sx={{border: 0, width: '100%', display: 'flex', flexDirection: 'column'}}>
                            <CardContent sx={{ flex: 1 }}>
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
