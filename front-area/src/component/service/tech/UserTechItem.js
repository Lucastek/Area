import Avatar from '@material-ui/core/Avatar'

const UserTechItem = (props) => {
  return (
    <div>
      <Avatar
        alt='Error loading avatar.'
        src={props.avatar}
        style={{ width: '100px', height: '100px' }}
      />
      <span>{props.login}</span>
    </div>
  )
}
export default UserTechItem
