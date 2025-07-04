import { FaInstagram, FaLinkedin, FaGithub } from "react-icons/fa"

function FollowOn() {
    return (
        <div className="faded-text pt-2">
            <span>Follow on:</span>
            <div className="flex gap-4 pt-3">
                <a href="https://www.linkedin.com/in/anshuman-goyal-0b270b11a/">
                    <FaLinkedin size={20} />
                </a>
                <a href="https://www.linkedin.com/in/anshuman-goyal-0b270b11a/">
                    <FaLinkedin size={20} />
                </a>
                <a href="https://www.linkedin.com/in/anshuman-goyal-0b270b11a/">
                    <FaLinkedin size={20} />
                </a>
            </div>
        </div>
    )
}

export default FollowOn