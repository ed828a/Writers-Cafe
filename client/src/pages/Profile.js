import React, { useEffect, useState } from 'react'
import { Redirect, Link } from 'react-router-dom'
import authorImage from '../images/profilePlaceholder.svg'
import Card from '../components/CardAuthor';
import add from '../images/plus.svg';

function Profile({ isLoggedIn }) {
    const [query, setQuery] = 'api/v1/auth/me';
    const [profileData, setProfileData] = useState([]);

    useEffect(() => {
        getMyProfileHandler()
    }, [query])
    const getMyProfileHandler = async () => {
        try {
            const response = await fetch("api/v1/auth/me")
            const data = await response.json();
            // console.log(data)
            setProfileData(data.data);
        } catch (err) {
            console.log(err)
        }
        console.log(profileData.writtenworks)
    }

    return (

        <>
            {
                profileData.writtenworks &&
                <div className="profilePage">
                    {!isLoggedIn ? <Redirect to="/read" /> : ""}
                    <div className="header">
                        <div className="section">
                            <div>
                                <img src={authorImage} alt="Profile Icon" />
                            </div>
                            <div>
                                <h1>{profileData.firstName} {profileData.lastName}</h1>
                                {console.log(profileData)}
                                <div className="hoverBlendWhiteButton">{profileData.location ? <div> {profileData.location.formattedAddress}</div> : <div> <img src={add} alt="Plus" /> Add Address</div>}</div>
                            </div>
                        </div>
                        <div className="section">
                            <input type="text" placeholder="Find Other Authors" />
                            <div className="button">Find Authors Near Me</div>
                            <Link to="/createWrittenWork"><div className="button">+ New Written Work</div></Link>
                        </div>
                    </div>
                    <div className="cardsSection">
                        {
                            profileData.writtenworks.map(writtenWork => { return <Card key={writtenWork._id} id={writtenWork._id} rating={writtenWork.averageRating} view={writtenWork.view} name={writtenWork.name} photo={writtenWork.photo} description={writtenWork.description} workType={writtenWork.workType} genre={writtenWork.genre} nsfw={writtenWork.nsfwContent} violence={writtenWork.violence} triggerWarning={writtenWork.suicideOrTriggerWarning} /> })
                        }
                    </div>
                </div>
            }
        </>
    )
}

export default Profile
