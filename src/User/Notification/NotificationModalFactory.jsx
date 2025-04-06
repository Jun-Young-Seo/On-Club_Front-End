import JoinRequestModal from "./JoinRequestModal";
import GuestAttendRequestModal from "./GuestAttendRequestModal";
const NotificationModalFactory = ({ notification, onClose, onApprove, onReject }) => {
  if (!notification || typeof notification !== "object" || !notification.type) return null;

  switch (notification.type) {
    case "JOIN_REQUEST":
      return (
        <JoinRequestModal
          notification={notification}
          onApprove={onApprove}     
          onReject={onReject}       
          onClose={onClose}
        />
      );
    case "GUEST_REQUEST":
        return(
            <GuestAttendRequestModal
              notification={notification}
              onApprove={onApprove}
              onReject={onReject}
              onClose={onClose}
              />
        )
    case "APPROVED":
      return null;
    default:
      return null;
  }
};

export default NotificationModalFactory;
