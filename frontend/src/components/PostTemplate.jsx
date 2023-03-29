import React from "react";

import {
    Anchor,
    Box,
    Button,
    Card,
    CardBody,
    CardHeader,
    CardFooter,
    Grid,
    Grommet,
    grommet,
    Header,
    Heading,
    Menu,
    Nav,
    Page,
    PageContent,
    PageHeader,
    Paragraph,
    ResponsiveContext,
    Text,
  } from "grommet";

export const PostTemplate = ({ title, user, date }) => {
    const size = React.useContext(ResponsiveContext);

    return (
        <Card>
        <CardHeader pad="medium">
            <Box pad="none" direction="column" justify="end">
            <Heading level={2} margin="none">
                {title}
            </Heading>
            <Heading level={4} margin="none">
                {user}
            </Heading>
            </Box>
        </CardHeader>
        <CardBody pad="medium">
            <Paragraph maxLines={size === "small" ? 3 : undefined}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas
            porttitor non nulla ac vehicula. Aliquam erat volutpat. Mauris
            auctor faucibus est at mattis. Aliquam a enim ac nisi aliquam
            consectetur et ac velit. Mauris ut imperdiet libero.
            </Paragraph>
        </CardBody>
        <CardFooter pad="medium" background="background-contrast">
            {date}
        </CardFooter>
        </Card>
    );
};