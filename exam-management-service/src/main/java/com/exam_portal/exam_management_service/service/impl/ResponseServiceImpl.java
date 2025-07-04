package com.exam_portal.exam_management_service.service.impl;

import com.exam_portal.exam_management_service.model.Response;
import com.exam_portal.exam_management_service.repository.ResponseRepository;
import com.exam_portal.exam_management_service.service.ResponseService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ResponseServiceImpl implements ResponseService {

    private final ResponseRepository responseRepository;

    @Override
    public List<Response> getResponsesByExamAndUser(Long examId, Long userId) {
        return responseRepository.findByExamIdAndUserId(examId, userId);
    }

    @Override
    public Response saveResponse(Response response) {
        return responseRepository.save(response);
    }
}