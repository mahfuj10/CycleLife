import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import '../../Cycles/Cycles/Cycle.css';
import Typography from '@mui/material/Typography';
import { Box, CardActionArea, Grid } from '@mui/material';
import Aos from 'aos';


const blogs = [

    {
        "image": "http://ergo.creativezeune.com/wp-content/uploads/sites/7/2021/02/us06qf_sxu8.jpg",
        "name": "Focus Ergo MX-514 Gravel Bike Review and advanture of jungle with team",
        "description": "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean lacinia bibendum",
        "id": "2"
    },
    {
        "image": "https://i.ibb.co/zspSGTL/slideshow-4.jpg",
        "name": "Cycling On Your Period: Harness The Power Of Your Hormones",
        "description": "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean lacinia bibendum",
        "id": "3"
    },
    {
        "image": "https://i.ibb.co/M5hzfrW/Full-Bike.jpg",
        "name": "Ergo Switchblade XRE12 – The Best Convertible Gear On The Market",
        "description": "Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Aenean lacinia bibendum",
        "id": "4"
    }
]

export default function Blogs() {

    React.useEffect(() => {
        Aos.init({
            duration: 2000,
        });
    }, []);

    return (
        <section style={{ background: "#111318" }}>

            <Box className='container' sx={{ pt: 14, pb: 15 }}>

                <Typography variant='h1'
                    data-aos="fade-up"
                    sx={{ fontFamily: 'Hikou Outline', color: "#353B48", fontSize: '70px', pt: 10, letterSpacing: 6 }}
                >
                    Latest News
                </Typography>

                <Typography variant='h1' sx={{ color: "#ffff", fontSize: '30px', mt: -3, letterSpacing: 3, fontWeight: 600 }}>OUR BLOGS</Typography>


                <Grid container spacing={2}>


                    {
                        blogs.map(blog => <Grid
                            className='blog'
                            key={blog.id}
                            item xs={12} sm={6} md={6} lg={4}>
                            <Card data-aos="fade-up" sx={{ maxWidth: 345, mt: 10, background: '#1E212A' }}>
                                <CardActionArea>
                                    <CardMedia
                                        height="230"
                                        component="img"
                                        image={blog.image}
                                        alt="blogImage"
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h6" sx={{ fontWeight: 600, color: "white" }} component="div">
                                            {blog.name}
                                        </Typography>
                                        <Typography sx={{ color: "#98a1bc" }} variant="body2" >
                                            {blog.description}
                                        </Typography>
                                        <Typography sx={{ color: "#ffff", mt: 2, mb: 1, letterSpacing: 2 }} variant="body2" >
                                            READ MORE
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                        )
                    };
                </Grid>
            </Box>
        </section>
    );
}
