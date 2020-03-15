import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import BackgroundImage from "gatsby-background-image"

const SectionWithBackgroundImage = ({ children, filename,  alt }) => (

    <StaticQuery
        query={graphql`
            query {
                images: allFile {
                    edges{
                        node {
                            relativePath
                            name 
                            childImageSharp {
                                fluid(maxWidth: 1920, quality: 100) {
                                    ...GatsbyImageSharpFluid
                                }
                            }
                        }
                    }
                }
            }
        `
        }

        render={data => {
            const image = data.images.edges.find( n => {
              return n.node.relativePath === filename
            })

            if (!image) {
              return null
            }
      
            const imageFluid = image.node.childImageSharp.fluid

            return (
                <BackgroundImage
                    fluid={imageFluid}
                    alt={alt}
                    style={{
                        height: `100vh`,
                        width: `100vw`,
                        backgroundColor: `transparent`,
                        backgroundSize: `cover`,
                        backgroundPosition: `center center`,
                        display: `flex`,
                        alignItems: `center`,
                    }}
                >

                    {children}
                
                </BackgroundImage>
            )
          }
        }
    />

)

SectionWithBackgroundImage.propTypes = {
    filename: PropTypes.string,
    alt: PropTypes.string,
    styleImage: PropTypes.object
}

SectionWithBackgroundImage.defaultProps = {
    filename: ``,
    alt: ``
}

export default SectionWithBackgroundImage
