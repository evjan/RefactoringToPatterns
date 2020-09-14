package client;

import descriptors.DefaultDescriptor;
import descriptors.ReferenceDescriptor;
import descriptors.RemoteUser;
import descriptors.User;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ClientCode {
    public List createAttributeDescriptors() {
        List result = new ArrayList();
        result.add(new DefaultDescriptor("remoteId", getClass(), Integer.TYPE));
        result.add(new DefaultDescriptor("createdDate", getClass(), Date.class));
        result.add(new DefaultDescriptor("lastChangedDate", getClass(), Date.class));
        result.add(new ReferenceDescriptor("createdBy", getClass(), User.class, RemoteUser.class));
        result.add(new ReferenceDescriptor("lastChangedBy", getClass(), User.class, RemoteUser.class));
        result.add(new DefaultDescriptor("optimisticLockVersion", getClass(), Integer.TYPE));
        return result;
    }
}
