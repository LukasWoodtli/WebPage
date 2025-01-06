import React from "react";
import { Card, CardContent, CardHeader, Grid, Typography } from "@mui/material";
import ConstructionIcon from "@mui/icons-material/Construction";
import GavelIcon from "@mui/icons-material/Gavel";
import StraightenIcon from "@mui/icons-material/Straighten";
import SchoolIcon from "@mui/icons-material/School";
import CableIcon from "@mui/icons-material/Cable";
import CloudQueueIcon from "@mui/icons-material/CloudQueue";
//import SummarizeIcon from '@mui/icons-material/Summarize';

const DashBoard = () => {

  const cards = [
    {
      avatar: <CableIcon fontSize="large" />,
      title: "Embedded Systems",
      text: "My experience with Embedded Systems range from small bare-metal " +
        "systems over RTOS to Embedded Linux devices. " +
                'In combination with my knowledge in distributed cloud systems I design reliable IoT systems. ' +
                'To improve and streamline the development process I develop simulations and SITL tools.'
        }, {
            avatar: <StraightenIcon fontSize="large"/>,
            title: 'Quality Software Design',
            text: 'To design reliable software I follow the practice of Test Driven Development. ' +
                'Moreover I use a lot of tools for quality verification such as linters, dynamic analysis tools and tracing. ' +
                'I have worked on quality related projects like high security access systems, medical devices and financial applications.'

        }, {
            avatar: <GavelIcon fontSize="large"/>,
            title: 'Improving Legacy Code',
            text: 'I have a lot of experience to turn legacy code bases to maintainable systems of high quality.' +
                'To be able to add tests to old code, I refactor it to decoupled Design Patterns and modern architectures.'
        }, {
            avatar: <ConstructionIcon fontSize="large"/>,
            title: 'Build and Continuous Integrations',
            text: 'With my extensive experience with build environments I develop sophisticated CI/CD pipelines.' +
                'Where I integrate automated testing and verification. ' +
                'Moreover I have battle proved knowledge with various build systems.'
        }, {
            avatar: <SchoolIcon fontSize="large"/>,
            title: 'Training and Coaching',
            text: <>I like to share my knowledge and experience. My training sessions include the following topics:
                <ul>
                    <li>Test Driven Development for Embedded Systems</li>
                    <li>Working with Legacy Embedded Code</li>
                    <li>Testing Tools and Tricks for C++</li>
                </ul>
                I also provide training tailored to your specific needs.</>
        }, {
            avatar: <CloudQueueIcon fontSize="large"/>,
            title: 'Distributed Systems',
            text: 'I have extensive knowledge in cloud environments and DevOps. My experience ranges from REST service development over infrastructure provisioning to container deployment and operations. Moreover I worked on large scale projects in different environments ranging from modular monoliths to microservices.'
        } /*, {
            avatar: <SummarizeIcon fontSize="large"/>,
            title: 'Contracting and Consulting',
            text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.'
        }*/

    ];
    return (
        <>
            <Grid
                container
                spacing={3}
                item
                direction="row"
                flexDirection="row"
                justifyContent="flex-start"
                alignItems="stretch"
                component="main"
                sx={{
                    flexGrow: 1,
                    px: 5,
                    py: 5
                }}
            >
                {cards.map(card => (
                    <Grid
                        item
                        xs={12}
                        sm={6}
                        md={4}
                        lg={4}
                        xl={4}
                        display="flex"
                        key={card.title}
                    >
                        <Card>
                            <CardHeader
                                avatar={card.avatar}
                                title={
                                    <Typography variant="h5" align="left">
                                        {card.title}
                                    </Typography>
                                }/>
                            <CardContent>
                              <Typography variant="body1" align="left" component={"div"}>
                                {card.text}
                              </Typography>
                            </CardContent>
                        </Card>
                    </Grid>))}
            </Grid>
        </>
    )
};

export default DashBoard;
