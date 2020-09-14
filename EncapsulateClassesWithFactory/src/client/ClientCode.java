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
        Class klass = getClass();
        result.add(new DefaultDescriptor("remoteId", klass, Integer.TYPE));
        result.add(new DefaultDescriptor("createdDate", klass, Date.class));
        result.add(new DefaultDescriptor("lastChangedDate", klass, Date.class));
        result.add(new ReferenceDescriptor("createdBy", klass, User.class, RemoteUser.class));
        result.add(new ReferenceDescriptor("lastChangedBy", klass, User.class, RemoteUser.class));
        result.add(new DefaultDescriptor("optimisticLockVersion", klass, Integer.TYPE));
        return result;
    }
}
