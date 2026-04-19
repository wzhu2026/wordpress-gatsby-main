import * as React from "react"
import { useEffect, useRef, useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { aboutStyles } from '../styles/homeStyles'

const AboutMe = () => {
  const cardRef = useRef(null)
  const [newSectionHeight, setNewSectionHeight] = useState(630)
  const [hoveredProject, setHoveredProject] = useState(null)

  const data = useStaticQuery(graphql`
    query AboutMeData {
      aboutCategory: allWordPressCategory(filter: { slug: { eq: "about" } }) {
        nodes {
          parsedData
        }
      }
      projectsCategory: allWordPressCategory(filter: { slug: { eq: "projects" } }) {
        nodes {
          parsedData
        }
      }
      skillsCategory: allWordPressCategory(filter: { slug: { eq: "skills" } }) {
        nodes {
          parsedData
        }
      }
    }
  `)

  const aboutData = data.aboutCategory?.nodes[0]?.parsedData || null
  const projectsData = data.projectsCategory?.nodes[0]?.parsedData || []
  const skillsData = data.skillsCategory?.nodes[0]?.parsedData || []

  // Adapt about data
  let about
  if (aboutData && aboutData.title) {
    about = {
      title: aboutData.title,
      content: aboutData.content || aboutData.description
    }
  } else if (aboutData && aboutData.basic) {
    about = {
      title: aboutData.basic.title,
      content: aboutData.basic.description
    }
  } else {
    about = {
      title: "关于我",
      content: "你好，我是一名热爱编程和分享知识的Web开发者。喜欢探索新技术，并通过博客分享我的学习和项目经验。"
    }
  }

  // Adapt project data
  let displayProjects = []
  if (projectsData && Array.isArray(projectsData)) {
    displayProjects = projectsData.slice(0, 3).map(project => ({
      title: project.title || project.name || "项目",
      description: project.description || project.content || project.excerpt?.rendered || "项目描述",
      svg: project.svg || project.image || "/static/image/project1.svg",
      technologies: project.technologies || project.tags || [],
      link: project.link || project.live_url || "#",
      github: project.github || project.github_url || "#"
    }))
  }

  // Adapt skill data
  let displaySkills = []
  if (skillsData && Array.isArray(skillsData)) {
    displaySkills = skillsData.map(skill => ({
      name: skill.name || skill.title || "技能",
      percentage: skill.percentage || 80,
      color: skill.color || "#76cfc5",
      icon: skill.icon || "S"
    }))
  }

  const leftSkills = displaySkills.filter((_, index) => index % 2 === 0)
  const rightSkills = displaySkills.filter((_, index) => index % 2 === 1)

  const dynamicNewSection = {
    ...aboutStyles.newSection,
    height: `${newSectionHeight}px`,
  }

  const finalCardStyle = {
    ...aboutStyles.cardStyle,
    opacity: 1,
    border: '2px solid transparent',
    background: 'linear-gradient(#fff, #fff) padding-box, linear-gradient(45deg, #dddddd, #eeeeee, #dddddd) border-box',
  }

  // 安全获取项目
  const project0 = displayProjects[0]
  const project1 = displayProjects[1]
  const project2 = displayProjects[2]

  return (
    <>
      <div style={aboutStyles.aboutSection}>
        <div style={aboutStyles.aboutContent}>
          <h2 style={aboutStyles.aboutTitle}>{about.title}</h2>
          <p style={aboutStyles.aboutText}>{about.content}</p>
        </div>
      </div>
      <div style={dynamicNewSection}></div>
      <div style={aboutStyles.thirdSection}>
        <div style={aboutStyles.projectsContent}>
          <h2 style={aboutStyles.projectsTitle}>项目作品</h2>
          <div style={aboutStyles.projectsGrid}>
            {project0 && (
              <div style={aboutStyles.projectRow}>
                <div style={aboutStyles.projectImageContainer}>
                  <img src={project0.svg} alt={project0.title} style={{ width: 400, height: 300 }} />
                </div>
                <div style={aboutStyles.projectContent}>
                  <h3 style={aboutStyles.projectTitle}>{project0.title}</h3>
                  <p style={aboutStyles.projectDescription}>{project0.description}</p>
                  <div style={aboutStyles.projectTechnologies}>
                    {(project0.technologies || []).map((technology) => (
                      <span key={technology} style={aboutStyles.technologyTag}>{technology}</span>
                    ))}
                  </div>
                  <div style={aboutStyles.projectLinks}>
                    {project0.link && (
                      <a 
                        href={project0.link} 
                        style={{
                          ...aboutStyles.projectLink,
                          ...(hoveredProject === '0-live' && aboutStyles.projectLinkHover)
                        }}
                        onMouseEnter={() => setHoveredProject('0-live')}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        在线预览 <span style={{ fontSize: '1.2rem' }}>→</span>
                      </a>
                    )}
                    {project0.github && (
                      <a 
                        href={project0.github} 
                        style={{
                          ...aboutStyles.projectLink,
                          ...(hoveredProject === '0-github' && aboutStyles.projectLinkHover)
                        }}
                        onMouseEnter={() => setHoveredProject('0-github')}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        GitHub <span style={{ fontSize: '1.2rem' }}>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={aboutStyles.fourthSection}>
        <div style={aboutStyles.projectsContent}>
          <div style={aboutStyles.projectsGrid}>
            {project1 && (
              <div style={aboutStyles.projectRow}>
                <div style={aboutStyles.projectContent}>
                  <h3 style={aboutStyles.projectTitle}>{project1.title}</h3>
                  <p style={aboutStyles.projectDescription}>{project1.description}</p>
                  <div style={aboutStyles.projectTechnologies}>
                    {(project1.technologies || []).map((technology) => (
                      <span key={technology} style={aboutStyles.technologyTag}>{technology}</span>
                    ))}
                  </div>
                  <div style={aboutStyles.projectLinks}>
                    {project1.link && (
                      <a 
                        href={project1.link} 
                        style={{
                          ...aboutStyles.projectLink,
                          ...(hoveredProject === '1-live' && aboutStyles.projectLinkHover)
                        }}
                        onMouseEnter={() => setHoveredProject('1-live')}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        在线预览 <span style={{ fontSize: '1.2rem' }}>→</span>
                      </a>
                    )}
                    {project1.github && (
                      <a 
                        href={project1.github} 
                        style={{
                          ...aboutStyles.projectLink,
                          ...(hoveredProject === '1-github' && aboutStyles.projectLinkHover)
                        }}
                        onMouseEnter={() => setHoveredProject('1-github')}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        GitHub <span style={{ fontSize: '1.2rem' }}>→</span>
                      </a>
                    )}
                  </div>
                </div>
                <div style={aboutStyles.projectImageContainer}>
                  <img src={project1.svg} alt={project1.title} style={{ width: 400, height: 300 }} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div style={aboutStyles.fifthSection}>
        <div style={aboutStyles.projectsContent}>
          <div style={aboutStyles.projectsGrid}>
            {project2 && (
              <div style={aboutStyles.projectRow}>
                <div style={aboutStyles.projectImageContainer}>
                  <img src={project2.svg} alt={project2.title} style={{ width: 400, height: 300 }} />
                </div>
                <div style={aboutStyles.projectContent}>
                  <h3 style={aboutStyles.projectTitle}>{project2.title}</h3>
                  <p style={aboutStyles.projectDescription}>{project2.description}</p>
                  <div style={aboutStyles.projectTechnologies}>
                    {(project2.technologies || []).map((technology) => (
                      <span key={technology} style={aboutStyles.technologyTag}>{technology}</span>
                    ))}
                  </div>
                  <div style={aboutStyles.projectLinks}>
                    {project2.link && (
                      <a 
                        href={project2.link} 
                        style={{
                          ...aboutStyles.projectLink,
                          ...(hoveredProject === '2-live' && aboutStyles.projectLinkHover)
                        }}
                        onMouseEnter={() => setHoveredProject('2-live')}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        在线预览 <span style={{ fontSize: '1.2rem' }}>→</span>
                      </a>
                    )}
                    {project2.github && (
                      <a 
                        href={project2.github} 
                        style={{
                          ...aboutStyles.projectLink,
                          ...(hoveredProject === '2-github' && aboutStyles.projectLinkHover)
                        }}
                        onMouseEnter={() => setHoveredProject('2-github')}
                        onMouseLeave={() => setHoveredProject(null)}
                      >
                        GitHub <span style={{ fontSize: '1.2rem' }}>→</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div ref={cardRef} style={finalCardStyle}>
        <h3 style={aboutStyles.cardTitle}>专业技能</h3>
        <div style={aboutStyles.skillsContainer}>
          {leftSkills.map((skill, index) => (
            <div key={skill.id || skill.name || index} style={aboutStyles.skillRow}>
              <div style={aboutStyles.skillItem}>
                <div style={aboutStyles.skillPercentage}>{skill.percentage || skill.acf?.percentage}%</div>
                <div style={aboutStyles.progressContainerLeft}>
                  <div style={aboutStyles.progressBarLeft}>
                    <div style={{...aboutStyles.progressFillLeft, width: `${skill.percentage || skill.acf?.percentage}%`}}></div>
                  </div>
                </div>
                <div style={{...aboutStyles.skillLogo, background: skill.color || skill.acf?.color}}>{skill.icon || skill.acf?.icon}</div>
              </div>
              {rightSkills[index] && (
                <div style={aboutStyles.skillItemRight}>
                  <div style={aboutStyles.skillPercentage}>{rightSkills[index].percentage || rightSkills[index].acf?.percentage}%</div>
                  <div style={aboutStyles.progressContainer}>
                    <div style={aboutStyles.progressBar}>
                      <div style={{...aboutStyles.progressFill, width: `${rightSkills[index].percentage || rightSkills[index].acf?.percentage}%`}}></div>
                    </div>
                  </div>
                  <div style={{...aboutStyles.skillLogo, background: rightSkills[index].color || rightSkills[index].acf?.color}}>{rightSkills[index].icon || rightSkills[index].acf?.icon}</div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default AboutMe
